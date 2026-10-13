// Quản lý trạng thái và logic ứng dụng Hôm Nay Ăn Gì?

class SoundManager {
  constructor() {
    this.enabled = true;
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 200, this.audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    } catch (e) {
      // Ignore audio errors
    }
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + idx * 0.1);
        gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + idx * 0.1 + 0.35);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(this.audioCtx.currentTime + idx * 0.1);
        osc.stop(this.audioCtx.currentTime + idx * 0.1 + 0.35);
      });
    } catch (e) {
      // Ignore
    }
  }
}

// Main Application Class
class FoodRandomizerApp {
  constructor() {
    this.sound = new SoundManager();
    this.foodData = this.loadFoodData();
    this.history = this.loadHistory();

    // Filters
    this.activeMealFilter = 'all';
    this.activeBudgetFilter = 'all';

    // State
    this.stage = 1; // 1: Pick Category, 2: Pick Item
    this.selectedCategoryKey = null;
    this.selectedDish = null;
    this.isSpinning = false;
    this.mode = 'wheel'; // 'wheel' | 'slot'

    // Canvas Wheel State
    this.canvas = document.getElementById('wheelCanvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.currentAngle = 0;
    this.activeWheelItems = [];

    this.init();
  }

  loadFoodData() {
    const saved = localStorage.getItem('viet_food_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing saved data', e);
      }
    }
    return JSON.parse(JSON.stringify(DEFAULT_FOOD_DATA));
  }

  saveFoodData() {
    localStorage.setItem('viet_food_data', JSON.stringify(this.foodData));
  }

  loadHistory() {
    const saved = localStorage.getItem('food_random_history');
    return saved ? JSON.parse(saved) : [];
  }

  saveHistory() {
    localStorage.setItem('food_random_history', JSON.stringify(this.history));
  }

  init() {
    this.bindEvents();
    this.renderHistory();
    this.prepareStage1Wheel();
    this.renderManageModal();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  bindEvents() {
    // Sound Toggle
    const soundBtn = document.getElementById('soundToggleBtn');
    soundBtn.addEventListener('click', () => {
      this.sound.enabled = !this.sound.enabled;
      soundBtn.innerHTML = this.sound.enabled 
        ? '<i data-lucide="volume-2" class="w-5 h-5"></i>' 
        : '<i data-lucide="volume-x" class="w-5 h-5 text-rose-400"></i>';
      if (window.lucide) window.lucide.createIcons();
    });

    // Mode Toggle
    document.getElementById('modeWheelBtn').addEventListener('click', () => this.switchMode('wheel'));
    document.getElementById('modeSlotBtn').addEventListener('click', () => this.switchMode('slot'));

    // Filter Buttons
    document.querySelectorAll('.meal-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.meal-filter-btn').forEach(b => {
          b.className = 'meal-filter-btn px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white';
        });
        btn.className = 'meal-filter-btn px-3 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/40';
        this.activeMealFilter = btn.dataset.meal;
        this.refreshWheelForCurrentStage();
      });
    });

    document.querySelectorAll('.budget-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.budget-filter-btn').forEach(b => {
          b.className = 'budget-filter-btn px-3 py-1 rounded-full text-xs font-medium bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white';
        });
        btn.className = 'budget-filter-btn px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
        this.activeBudgetFilter = btn.dataset.budget;
        this.refreshWheelForCurrentStage();
      });
    });

    // Spin Buttons
    document.getElementById('spinBtn').addEventListener('click', () => this.triggerSpin());
    document.getElementById('centerSpinBtn').addEventListener('click', () => this.triggerSpin());
    document.getElementById('slotSpinBtn').addEventListener('click', () => this.triggerSpin());

    // Navigation Buttons
    document.getElementById('triggerStep2Btn').addEventListener('click', () => this.goToStage2());
    document.getElementById('resetFlowBtn').addEventListener('click', () => this.resetFlow());
    document.getElementById('spinAgainBtn').addEventListener('click', () => {
      // Keep category, spin stage 2 again
      this.goToStage2();
      setTimeout(() => this.triggerSpin(), 300);
    });

    // Clear history
    document.getElementById('clearHistoryBtn').addEventListener('click', () => {
      this.history = [];
      this.saveHistory();
      this.renderHistory();
    });

    // Manage Modal Events
    const modal = document.getElementById('manageModal');
    document.getElementById('openManageBtn').addEventListener('click', () => {
      this.renderManageModal();
      modal.classList.remove('hidden');
    });
    document.getElementById('closeManageBtn').addEventListener('click', () => modal.classList.add('hidden'));
    document.getElementById('closeManageBottomBtn').addEventListener('click', () => modal.classList.add('hidden'));

    // Reset default data
    document.getElementById('resetDefaultDataBtn').addEventListener('click', () => {
      if (confirm('Bạn có chắc chắn muốn khôi phục lại danh sách món ban đầu không?')) {
        this.foodData = JSON.parse(JSON.stringify(DEFAULT_FOOD_DATA));
        this.saveFoodData();
        this.renderManageModal();
        this.refreshWheelForCurrentStage();
      }
    });

    // Add new dish form
    document.getElementById('addDishForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const catKey = document.getElementById('newDishCategory').value;
      const name = document.getElementById('newDishName').value.trim();
      const desc = document.getElementById('newDishDesc').value.trim() || 'Món ngon mỗi ngày chuẩn vị Việt';
      const image = document.getElementById('newDishImage').value.trim() || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
      const calories = document.getElementById('newDishCalories').value.trim() || '~500 kcal';

      if (!name || !this.foodData[catKey]) return;

      this.foodData[catKey].items.push({
        name,
        desc,
        image,
        calories,
        meal: ['sang', 'trua', 'toi'],
        budget: 'binh_dan'
      });

      this.saveFoodData();
      this.renderManageModal();
      this.refreshWheelForCurrentStage();

      // Reset form fields
      document.getElementById('newDishName').value = '';
      document.getElementById('newDishDesc').value = '';
      document.getElementById('newDishImage').value = '';
      document.getElementById('newDishCalories').value = '';
      alert('Đã thêm món mới thành công!');
    });
  }

  switchMode(mode) {
    this.mode = mode;
    const wheelBtn = document.getElementById('modeWheelBtn');
    const slotBtn = document.getElementById('modeSlotBtn');
    const wheelView = document.getElementById('wheelModeView');
    const slotView = document.getElementById('slotModeView');

    if (mode === 'wheel') {
      wheelBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition bg-orange-500 text-white shadow-sm';
      slotBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-slate-400 hover:text-white transition';
      wheelView.classList.remove('hidden');
      slotView.classList.add('hidden');
      this.drawWheel();
    } else {
      slotBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition bg-orange-500 text-white shadow-sm';
      wheelBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-slate-400 hover:text-white transition';
      slotView.classList.remove('hidden');
      wheelView.classList.add('hidden');
      this.updateSlotPlaceholder();
    }
  }

  // Lọc dữ liệu thể loại (Stage 1)
  getFilteredCategories() {
    const list = [];
    for (const [key, cat] of Object.entries(this.foodData)) {
      // Check meal
      const matchMeal = this.activeMealFilter === 'all' || cat.tags.includes(this.activeMealFilter);
      // Check budget
      const matchBudget = this.activeBudgetFilter === 'all' || cat.tags.includes(this.activeBudgetFilter);
      
      // Hoặc kiểm tra xem có bất kỳ item con nào thỏa mãn không
      const hasMatchingItems = cat.items.some(item => {
        const itemMeal = !item.meal || item.meal.includes(this.activeMealFilter) || this.activeMealFilter === 'all';
        const itemBudget = !item.budget || item.budget === this.activeBudgetFilter || this.activeBudgetFilter === 'all';
        return itemMeal && itemBudget;
      });

      if ((matchMeal && matchBudget) || hasMatchingItems) {
        list.push({ key, ...cat });
      }
    }
    return list.length > 0 ? list : Object.entries(this.foodData).map(([key, cat]) => ({ key, ...cat }));
  }

  // Lọc dữ liệu món cụ thể (Stage 2)
  getFilteredItemsForCategory(catKey) {
    const cat = this.foodData[catKey];
    if (!cat) return [];

    let filtered = cat.items.filter(item => {
      const matchMeal = this.activeMealFilter === 'all' || (item.meal && item.meal.includes(this.activeMealFilter));
      const matchBudget = this.activeBudgetFilter === 'all' || (item.budget && item.budget === this.activeBudgetFilter);
      return matchMeal && matchBudget;
    });

    // Nếu lọc quá chặt không ra món nào thì fallback về toàn bộ món của danh mục
    return filtered.length > 0 ? filtered : cat.items;
  }

  prepareStage1Wheel() {
    this.stage = 1;
    this.selectedCategoryKey = null;
    this.selectedDish = null;

    // Update Step Indicator
    document.getElementById('stepLineProgress').style.width = '0%';
    document.getElementById('stepNode1').querySelector('div').className = 'w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center shadow-lg shadow-orange-500/40 border-4 border-slate-950 transition-all';
    document.getElementById('stepNode2').querySelector('div').className = 'w-10 h-10 rounded-full bg-slate-800 text-slate-400 font-bold flex items-center justify-center border-4 border-slate-950 transition-all';
    document.getElementById('stepNode3').querySelector('div').className = 'w-10 h-10 rounded-full bg-slate-800 text-slate-400 font-bold flex items-center justify-center border-4 border-slate-950 transition-all';

    // Banner Text
    document.getElementById('stageBanner').innerHTML = `
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white">
        Tầng 1: Chọn Thể Loại Món Ăn
      </h2>
      <p class="text-sm text-slate-400 mt-1 max-w-lg mx-auto">
        (Cơm, Phở, Mỳ, Bún, Miến, Lẩu, Nướng, Đồ Chay...)
      </p>
    `;

    document.getElementById('badgeCategory').textContent = 'Chưa chọn thể loại';
    document.getElementById('badgeCategory').className = 'px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-400';

    // Show placeholder, hide others
    document.getElementById('placeholderResult').classList.remove('hidden');
    document.getElementById('categoryResultCard').classList.add('hidden');
    document.getElementById('finalResultCard').classList.add('hidden');

    const categories = this.getFilteredCategories();
    const colors = [
      '#EF4444', '#F97316', '#F59E0B', '#10B981', 
      '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#84CC16'
    ];

    this.activeWheelItems = categories.map((c, i) => ({
      id: c.key,
      text: `${c.icon} ${c.name}`,
      shortName: c.name,
      color: colors[i % colors.length],
      raw: c
    }));

    this.drawWheel();
    this.updateSlotPlaceholder();
  }

  prepareStage2Wheel() {
    this.stage = 2;
    this.selectedDish = null;

    // Update Step Indicator
    document.getElementById('stepLineProgress').style.width = '50%';
    document.getElementById('stepNode1').querySelector('div').className = 'w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shadow-lg border-4 border-slate-950 transition-all';
    document.getElementById('stepNode2').querySelector('div').className = 'w-10 h-10 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center shadow-lg shadow-orange-500/40 border-4 border-slate-950 transition-all';

    const cat = this.foodData[this.selectedCategoryKey];
    document.getElementById('stageBanner').innerHTML = `
      <h2 class="text-2xl sm:text-3xl font-extrabold text-orange-400">
        Tầng 2: Chọn Món ${cat.name} Hôm Nay!
      </h2>
      <p class="text-sm text-slate-400 mt-1 max-w-lg mx-auto">
        Đã chốt nhóm <b>${cat.name}</b>. Hãy quay tiếp để xem hôm nay cụ thể ăn món nào nhé!
      </p>
    `;

    const items = this.getFilteredItemsForCategory(this.selectedCategoryKey);
    const colors = [
      '#F97316', '#EF4444', '#F59E0B', '#10B981', 
      '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6'
    ];

    this.activeWheelItems = items.map((item, i) => ({
      id: item.name,
      text: item.name,
      shortName: item.name,
      color: colors[i % colors.length],
      raw: item
    }));

    this.drawWheel();
    this.updateSlotPlaceholder();
  }

  refreshWheelForCurrentStage() {
    if (this.isSpinning) return;
    if (this.stage === 1) {
      this.prepareStage1Wheel();
    } else {
      this.prepareStage2Wheel();
    }
  }

  goToStage2() {
    if (!this.selectedCategoryKey) return;
    this.prepareStage2Wheel();
    window.scrollTo({ top: 120, behavior: 'smooth' });
  }

  resetFlow() {
    this.prepareStage1Wheel();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  drawWheel() {
    if (!this.ctx || !this.canvas) return;

    const items = this.activeWheelItems;
    if (!items || items.length === 0) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 12;
    const numSlices = items.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    this.ctx.clearRect(0, 0, width, height);

    // Draw Wheel Outer Ring
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius + 8, 0, 2 * Math.PI);
    this.ctx.fillStyle = '#1e293b';
    this.ctx.fill();
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = '#334155';
    this.ctx.stroke();

    for (let i = 0; i < numSlices; i++) {
      const startAngle = this.currentAngle + i * sliceAngle;
      const endAngle = startAngle + sliceAngle;

      // Slice sector
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      this.ctx.closePath();

      this.ctx.fillStyle = items[i].color;
      this.ctx.fill();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = '#0f172a';
      this.ctx.stroke();

      // Text label inside slice
      this.ctx.save();
      this.ctx.translate(centerX, centerY);
      this.ctx.rotate(startAngle + sliceAngle / 2);
      this.ctx.textAlign = 'right';
      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      this.ctx.shadowColor = 'rgba(0,0,0,0.6)';
      this.ctx.shadowBlur = 4;

      // Truncate if long
      let label = items[i].text;
      if (label.length > 18) label = label.substring(0, 16) + '...';
      this.ctx.fillText(label, radius - 24, 6);
      this.ctx.restore();
    }

    // Outer Bulbs / Dots
    for (let i = 0; i < 24; i++) {
      const dotAngle = (i * 2 * Math.PI) / 24;
      const dotX = centerX + (radius + 4) * Math.cos(dotAngle);
      const dotY = centerY + (radius + 4) * Math.sin(dotAngle);

      this.ctx.beginPath();
      this.ctx.arc(dotX, dotY, 3, 0, 2 * Math.PI);
      this.ctx.fillStyle = i % 2 === 0 ? '#fbbf24' : '#ffffff';
      this.ctx.fill();
    }
  }

  updateSlotPlaceholder() {
    const slotTrack = document.getElementById('slotTrack');
    if (!slotTrack) return;
    if (this.stage === 1) {
      slotTrack.innerHTML = `
        <span class="text-6xl mb-2">🎲</span>
        <span class="text-xl font-bold text-white">Tầng 1: Chọn thể loại</span>
      `;
    } else {
      const cat = this.foodData[this.selectedCategoryKey];
      slotTrack.innerHTML = `
        <span class="text-6xl mb-2">${cat.icon}</span>
        <span class="text-xl font-bold text-white">Tầng 2: Món ${cat.name}</span>
      `;
    }
  }

  triggerSpin() {
    if (this.isSpinning) return;
    if (this.mode === 'wheel') {
      this.spinWheel();
    } else {
      this.spinSlot();
    }
  }

  spinWheel() {
    this.isSpinning = true;
    const items = this.activeWheelItems;
    const numSlices = items.length;
    const sliceAngle = (2 * Math.PI) / numSlices;

    // Random winner index
    const winningIndex = Math.floor(Math.random() * numSlices);
    const extraRotations = 5 + Math.floor(Math.random() * 4); // 5 to 8 turns
    const duration = 4000; // ms

    // Note: The pointer is at TOP (3 * PI / 2 or -PI / 2).
    // Target angle calculation:
    const targetSliceAngle = (3 * Math.PI / 2) - (winningIndex * sliceAngle + sliceAngle / 2);
    const totalAngleToRotate = (extraRotations * 2 * Math.PI) + (targetSliceAngle - (this.currentAngle % (2 * Math.PI)));

    const startAngle = this.currentAngle;
    const finalAngle = startAngle + totalAngleToRotate;
    const startTime = performance.now();
    let lastTickAngle = startAngle;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      this.currentAngle = startAngle + (finalAngle - startAngle) * ease;
      this.drawWheel();

      // Sound tick on passing slices
      if (Math.abs(this.currentAngle - lastTickAngle) >= sliceAngle * 0.8) {
        this.sound.playTick();
        lastTickAngle = this.currentAngle;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        this.handleSpinComplete(items[winningIndex]);
      }
    };

    requestAnimationFrame(animate);
  }

  spinSlot() {
    this.isSpinning = true;
    const items = this.activeWheelItems;
    const slotTrack = document.getElementById('slotTrack');
    const winningIndex = Math.floor(Math.random() * items.length);

    let speed = 60; // ms per change
    let step = 0;
    const totalSteps = 35 + Math.floor(Math.random() * 15);

    const interval = () => {
      step++;
      const currentItem = items[step % items.length];
      slotTrack.innerHTML = `
        <span class="text-6xl mb-2 animate-bounce">${currentItem.raw.icon || '🍽️'}</span>
        <span class="text-2xl font-black text-amber-400">${currentItem.shortName}</span>
      `;
      this.sound.playTick();

      if (step < totalSteps) {
        // Slow down near the end
        if (step > totalSteps - 10) {
          speed += 25;
        }
        setTimeout(interval, speed);
      } else {
        this.isSpinning = false;
        const winner = items[winningIndex];
        slotTrack.innerHTML = `
          <span class="text-6xl mb-2 animate-pop">${winner.raw.icon || '🎉'}</span>
          <span class="text-2xl font-black text-white">${winner.shortName}</span>
        `;
        this.handleSpinComplete(winner);
      }
    };

    interval();
  }

  handleSpinComplete(winningItem) {
    this.sound.playWin();

    // Trigger Confetti
    if (window.confetti) {
      window.confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    if (this.stage === 1) {
      // Finished Stage 1
      this.selectedCategoryKey = winningItem.id;
      const cat = winningItem.raw;

      document.getElementById('placeholderResult').classList.add('hidden');
      document.getElementById('finalResultCard').classList.add('hidden');
      const catCard = document.getElementById('categoryResultCard');
      catCard.classList.remove('hidden');

      document.getElementById('badgeCategory').textContent = cat.name;
      document.getElementById('badgeCategory').className = 'px-3 py-0.5 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/40';

      document.getElementById('categoryImg').src = cat.image;
      document.getElementById('categoryEmoji').textContent = cat.icon;
      document.getElementById('categoryTitle').textContent = cat.name;
      document.getElementById('categoryDesc').textContent = cat.description;

    } else {
      // Finished Stage 2
      this.selectedDish = winningItem.raw;
      const dish = winningItem.raw;
      const cat = this.foodData[this.selectedCategoryKey];

      // Step indicator to 100%
      document.getElementById('stepLineProgress').style.width = '100%';
      document.getElementById('stepNode3').querySelector('div').className = 'w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center shadow-lg shadow-emerald-500/40 border-4 border-slate-950 transition-all';

      document.getElementById('placeholderResult').classList.add('hidden');
      document.getElementById('categoryResultCard').classList.add('hidden');
      const finalCard = document.getElementById('finalResultCard');
      finalCard.classList.remove('hidden');

      document.getElementById('finalDishImg').src = dish.image;
      document.getElementById('finalDishCategoryBadge').textContent = `THỂ LOẠI: ${cat.name.toUpperCase()}`;
      document.getElementById('finalDishName').textContent = dish.name;
      document.getElementById('finalDishDesc').textContent = dish.desc;
      document.getElementById('finalDishCalories').textContent = dish.calories || '~550 kcal';
      
      const mealNames = { sang: 'Sáng', trua: 'Trưa', toi: 'Tối', an_vat: 'Ăn vặt' };
      const mealsStr = dish.meal ? dish.meal.map(m => mealNames[m] || m).join(', ') : 'Mọi bữa';
      document.getElementById('finalDishMeal').textContent = mealsStr;

      // Google Maps URL
      const mapsQuery = encodeURIComponent(`${dish.name} gần đây`);
      document.getElementById('findNearbyBtn').href = `https://www.google.com/maps/search/${mapsQuery}`;

      // Save to History
      this.history.unshift({
        category: cat.name,
        name: dish.name,
        image: dish.image,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      });
      if (this.history.length > 15) this.history.pop();
      this.saveHistory();
      this.renderHistory();

      // Big celebration confetti
      if (window.confetti) {
        setTimeout(() => {
          window.confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
        }, 300);
      }
    }
  }

  renderHistory() {
    const list = document.getElementById('historyList');
    if (!list) return;

    if (this.history.length === 0) {
      list.innerHTML = `<div class="text-center py-4 text-xs text-slate-500">Chưa có món nào được chọn</div>`;
      return;
    }

    list.innerHTML = this.history.map(item => `
      <div class="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition">
        <img src="${item.image}" alt="${item.name}" class="w-10 h-10 rounded-lg object-cover">
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-bold text-slate-200 truncate">${item.name}</h4>
          <span class="text-[10px] text-orange-400 font-medium">${item.category} • ${item.time}</span>
        </div>
        <a href="https://www.google.com/maps/search/${encodeURIComponent(item.name + ' gần đây')}" target="_blank" title="Tìm quán" class="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition">
          <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  renderManageModal() {
    // Populate Category dropdown
    const select = document.getElementById('newDishCategory');
    if (select) {
      select.innerHTML = Object.entries(this.foodData).map(([key, cat]) => `
        <option value="${key}">${cat.icon} ${cat.name}</option>
      `).join('');
    }

    // Populate Category Items List
    const manageList = document.getElementById('categoryManageList');
    if (!manageList) return;

    manageList.innerHTML = Object.entries(this.foodData).map(([key, cat]) => `
      <div class="rounded-xl border border-slate-800 bg-slate-950 p-3">
        <div class="flex items-center justify-between mb-2 pb-2 border-b border-slate-900">
          <div class="flex items-center gap-2">
            <span class="text-lg">${cat.icon}</span>
            <span class="text-xs font-bold text-white">${cat.name}</span>
            <span class="text-[11px] text-slate-400">(${cat.items.length} món)</span>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${cat.items.map((item, index) => `
            <div class="flex items-center justify-between p-2 rounded-lg bg-slate-900/80 border border-slate-800/60 text-xs">
              <span class="truncate pr-2 font-medium text-slate-300">${item.name}</span>
              <button onclick="window.app.deleteDish('${key}', ${index})" class="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-slate-800 transition" title="Xóa món này">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  deleteDish(catKey, index) {
    if (this.foodData[catKey] && this.foodData[catKey].items) {
      if (this.foodData[catKey].items.length <= 1) {
        alert('Mỗi thể loại cần có ít nhất 1 món!');
        return;
      }
      this.foodData[catKey].items.splice(index, 1);
      this.saveFoodData();
      this.renderManageModal();
      this.refreshWheelForCurrentStage();
    }
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.app = new FoodRandomizerApp();
});
