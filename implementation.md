#処理系
- [Clang](#clang)
- [GNU Compiler Collection](#gcc)
- [Intel C++ Compiler](#icc)
- [Microsoft Visual C++](#visual_cpp)

## <a name="clang" href="#clang">Clang</a>
このサイトでは Clang と呼ぶ。「クラン(グ)」と読む。

- ["clang" C Language Family Frontend for LLVM](http://clang.llvm.org/)

###別名
- clang
- clang++

###C++11の機能を有効にする
- `-std=c++11`オプションを使用する。

###C++14の機能を有効にする
- Clang 3.2から3.4までは、`-std=c++1y`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1y`オプションもある。
- Clang 3.5以降は、`-std=c++14`オプションを使用する(以前までのオプションも使用できる)。
    - GNU拡張を有効にする`-std=gnu++14`オプションもある。


###C++1zの機能を有効にする
- Clang 3.5以降は、`-std=c++1z`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1z`オプションもある。


## <a name="gcc" href="#gcc">GNU Compiler Collection</a>
このサイトでは GCC と呼ぶ

- [GCC, the GNU Compiler Collection - GNU Project - Free Software Foundation (FSF)](http://gcc.gnu.org/)
- [MinGW | Minimalist GNU for Windows](http://www.mingw.org/)
- [Fortran, C, C++ for Windows](http://www.equation.com/servlet/equation.cmd?fa=fortran) (MinGW バイナリ)

###別名
- gcc
- g++

C++0x (C++11)の機能をオンにしている GCC を GCC, C++0x mode と呼ぶ。 
-std=c++0x オブションまたは-std=c++11 オプション（GCC 4.7より）をつけて，コンパイラを実行することを意味する。 

###C++11の機能を有効にする
- GCC 4.3から4.6までは、`-std=c++0x`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++0x`オプションもある。
- GCC 4.7以降は、`-std=c++11`オプションを使用する(旧オプションは非推奨)。
    - GNU拡張を有効にする`-std=gnu++11`オプションもある。


###C++14の機能を有効にする
- GCC 4.8から4.9までは、`-std=c++1y`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1y`オプションもある。
- GCC 5.1以降は、`-std=c++14`オプションを使用する(旧オプションは非推奨)。
    - GNU拡張を有効にする`-std=gnu++14`オプションもある。

## <a name="icc" href="#icc">Intel C++ Compiler</a>
このサイトでは ICC と呼ぶ。

- [XLsoft エクセルソフト : インテル C++ Composer XE Linux 版/インテル C++ コンパイラー XE Linux 版 製品紹介](http://www.xlsoft.com/jp/products/intel/compilers/ccl/index.html?tab=0) 
- [XLsoft エクセルソフト : インテル C++ Composer XE Mac OS 版/インテル C++ コンパイラー XE Mac OS 版 製品紹介](http://www.xlsoft.com/jp/products/intel/compilers/ccm/index.html?tab=0) 
- [XLsoft エクセルソフト : インテル C++ Composer XE Windows 版/インテル C++ コンパイラー XE Windows 版 製品紹介](http://www.xlsoft.com/jp/products/intel/compilers/ccw/) 

###別名
- ICC
- ICL


###C++11の機能を有効にする
- Windowsでは`/Qstd:c++11`、Linux/OS Xでは`-std=c++11`オプションを使用する。


###C++14の機能を有効にする
- ICC 16.0からは、Windowsでは`/Qstd:c++14`オプション、Linux/OS Xでは`-std=c++14`オプションを使用する。


## <a name="visual_cpp" href="#visual_cpp">Microsoft Visual C++</a>
このサイトでは Visual C++ と呼ぶ。

- [Microsoft Visual Studio Express](http://www.microsoft.com/japan/msdn/vstudio/express/)

###別名
- VC
- VC++
- MSVC
- cl

###バージョンの表記
Visual C++ 2010 ではなく Visual C++ 10.0 と表記する。

| 製品名               | バージョン      | 定数`_MSC_VER`の値 |
|----------------------|-----------------|--------------------|
| Visual C++ 2015      | 14.0 | 1900 |
| Visual C++ 2013      | 12.0 | 1800 |
| Visual C++ 2012      | 11.0 | 1700 |
| Visual C++ 2010      | 10.0 | 1600 |
| Visual C++ 2008      | 9.0  | 1500 |
| Visual C++ 2005      | 8.0  | 1400 |
| Visual C++ .NET 2003 | 7.1  | 1310 |
| Visual C++ .NET 2002 | 7.0  | 1300 |
| Visual C++ 6.0       | 6.0  | 1200 |



