const displayArea = document.getElementById('display-area');

function showWelcome() {
    displayArea.innerHTML = `
        <div class="animate-pop mt-6">
            <h1 class="text-4xl font-bold text-white mb-2 leading-tight">Welcome Back !</h1>
            <p class="text-gray-400 mb-10">Please Sign In To Continue</p>
            <div class="space-y-6">
                <div class="relative border-b border-gray-600 focus-within:border-yellow-400 transition-colors">
                     <div class="absolute inset-y-0 left-0 flex items-center">
                        <div class="bg-yellow-400/20 p-2 rounded-lg text-yellow-400"><i class="fas fa-user"></i></div>
                     </div>
                     <input type="text" placeholder="Username" class="w-full bg-transparent py-4 pl-14 text-white focus:outline-none">
                </div>

                <div class="relative border-b border-gray-600 focus-within:border-yellow-400 transition-colors">
                     <div class="absolute inset-y-0 left-0 flex items-center">
                        <div class="bg-pink-500/20 p-2 rounded-lg text-pink-500"><i class="fas fa-lock"></i></div>
                     </div>
                     <input type="password" placeholder="Password" class="w-full bg-transparent py-4 pl-14 text-white focus:outline-none">
                </div>

                <div class="flex items-center gap-2 mt-6 text-gray-400 text-sm">
                <input type="checkbox" checked class="w-4 h-4 accent-yellow-400">
                <span>Remember Me</span>
                </div>
            </div>
            <div class="mt-10 flex items-center justify-between">
                <a href= "choose.html">
                <button class="bg-white text-[#1a2a44] px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-yellow-400 transition-all shadow-lg active:scale-95">
                     Sign In <i class="fas fa-arrow-right"></i>
                </button>
                </a>
                <a href= "choose.html">
                <button class="bg-transparent text-gray-400 hover:text-white underline">As Guest
                </button>
                </a>
            </div>
            <a href="create.html">
                <button class="mt-8 w-full border-2 border-white text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 group hover:bg-white hover:text-[#1a2a44] transition-all">
                 Create An Account
                    <div class="bg-white text-[#1a2a44] w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#1a2a44] group-hover:text-white transition-colors">
                        <i class="fas fa-arrow-right text-xs"></i>
                    </div>
                </button>
            </a>
        </div>
    `;
}


showWelcome();