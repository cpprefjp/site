# 処理系
- [Clang](#clang)
- [GNU Compiler Collection](#gcc)
- [Intel C++ Compiler](#icc)
- [Microsoft Visual C++](#visual_cpp)

## <a name="clang" href="#clang">Clang</a>
このサイトでは Clang と呼ぶ。「クラン(グ)」と読む。

- ["clang" C Language Family Frontend for LLVM](http://clang.llvm.org/)

### 別名
- clang
- clang++
- Apple LLVMコンパイラ

### C++11の機能を有効にする
- `-std=c++11`オプションを使用する。

### C++14の機能を有効にする
- Clang 3.2から3.4までは、`-std=c++1y`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1y`オプションもある。
- Clang 3.5以降は、`-std=c++14`オプションを使用する(以前までのオプションも使用できる)。
    - GNU拡張を有効にする`-std=gnu++14`オプションもある。


### C++1zの機能を有効にする
- Clang 3.5以降は、`-std=c++1z`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1z`オプションもある。


## <a name="gcc" href="#gcc">GNU Compiler Collection</a>
このサイトでは GCC と呼ぶ

- [GCC, the GNU Compiler Collection - GNU Project - Free Software Foundation (FSF)](https://gcc.gnu.org/)
- [MinGW | Minimalist GNU for Windows](http://www.mingw.org/)
- [Fortran, C, C++ for Windows](http://www.equation.com/servlet/equation.cmd?fa=fortran) (MinGW バイナリ)

### 別名
- gcc
- g++

### C++11の機能を有効にする
- GCC 4.3から4.6までは、`-std=c++0x`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++0x`オプションもある。
- GCC 4.7以降は、`-std=c++11`オプションを使用する(旧オプションは非推奨)。
    - GNU拡張を有効にする`-std=gnu++11`オプションもある。


### C++14の機能を有効にする
- GCC 4.8から4.9までは、`-std=c++1y`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1y`オプションもある。
- GCC 5.1以降は、`-std=c++14`オプションを使用する(旧オプションは非推奨)。
    - GNU拡張を有効にする`-std=gnu++14`オプションもある。
- GCC 6.1以降は、C++14がデフォルトとなる。デフォルトバージョンのコンパイルオプションは`-std=gnu++14`


### C++1zの機能を有効にする
- GCC 6.1以降は、`-std=c++1z`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1z`オプションもある。


## <a name="icc" href="#icc">Intel C++ Compiler</a>
このサイトでは ICC と呼ぶ。

- [XLsoft エクセルソフト : インテル C++ Composer XE Linux 版/インテル C++ コンパイラー XE Linux 版 製品紹介](https://www.xlsoft.com/jp/products/intel/compilers/ccl/index.html?tab=0)
- [XLsoft エクセルソフト : インテル C++ Composer XE Mac OS 版/インテル C++ コンパイラー XE Mac OS 版 製品紹介](https://www.xlsoft.com/jp/products/intel/compilers/ccl/index.html?tab=0)
- [XLsoft エクセルソフト : インテル C++ Composer XE Windows 版/インテル C++ コンパイラー XE Windows 版 製品紹介](https://www.xlsoft.com/jp/products/intel/compilers/ccw/index.html?tab=0)

### 別名
- ICC
- ICL


### C++11の機能を有効にする
- Windowsでは`/Qstd:c++11`、Linux/OS Xでは`-std=c++11`オプションを使用する。


### C++14の機能を有効にする
- ICC 16.0からは、Windowsでは`/Qstd:c++14`オプション、Linux/OS Xでは`-std=c++14`オプションを使用する。


## <a name="visual_cpp" href="#visual_cpp">Microsoft Visual C++</a>
このサイトでは Visual C++ と呼ぶ。

- [Visual Studio - Microsoft Developer Tools](https://www.visualstudio.com/ja-jp/visual-studio-homepage-vs.aspx): Visual C++を含む統合開発環境。
- [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools): コンパイラおよび関連ツールのみのパッケージ。

### 別名
- VC
- VC++
- MSVC
- cl

### バージョンの表記
このサイトでは Visual C++ 2010 などではなく、 Visual C++ 10.0 などと表記する。

| 製品名               | バージョン      | 定数`_MSC_VER`の値 |
|----------------------|-----------------|--------------------|
| Visual C++ 2017      | 14.1 | 1910 |
| Visual C++ 2015      | 14.0 | 1900 |
| Visual C++ 2013      | 12.0 | 1800 |
| Visual C++ 2012      | 11.0 | 1700 |
| Visual C++ 2010      | 10.0 | 1600 |
| Visual C++ 2008      | 9.0  | 1500 |
| Visual C++ 2005      | 8.0  | 1400 |
| Visual C++ .NET 2003 | 7.1  | 1310 |
| Visual C++ .NET 2002 | 7.0  | 1300 |
| Visual C++ 6.0       | 6.0  | 1200 |

### C++14の機能を有効にする
- 14.0 Update 2までは、言語のバージョンを切り替える機能はなく、そのリリース時の最新言語バージョンが有効となる
- 14.0 Update 3からは、`/std:c++14`オプションを使用する。とくに指定しない場合はデフォルトでC++14が有効となる


### 最新バージョンの言語機能を有効にする
- 14.0 Update 3からは、`/std:c++latest`オプションを使用する。


- [Standards version switches in the compiler](https://blogs.msdn.microsoft.com/vcblog/2016/06/07/standards-version-switches-in-the-compiler/)
