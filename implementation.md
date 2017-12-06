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


### C++17の機能を有効にする
- Clang 3.5から4.0までは、`-std=c++1z`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1z`オプションもある。
- Clang 5.0以降は、`-std=c++17`オプションを使用する(以前までのオプションも使用できる)。
    - GNU拡張を有効にする`-std=gnu++17`オプションもある。


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


### C++17の機能を有効にする
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
- Windowsでは`/Qstd:c++11`、Linux/macOSでは`-std=c++11`オプションを使用する。


### C++14の機能を有効にする
- ICC 16.0からは、Windowsでは`/Qstd:c++14`オプション、Linux/macOSでは`-std=c++14`オプションを使用する。


### C++17の機能を有効にする
- ICC 17.0からは、Windowsでは`/Qstd:c++17`オプション、Linux/macOSでは`-std=c++17`オプションを使用する。


## <a name="visual_cpp" href="#visual_cpp">Microsoft Visual C++</a>
このサイトでは Visual C++ と呼ぶ。

- [Visual Studio - Microsoft Developer Tools](https://www.visualstudio.com/ja-jp/visual-studio-homepage-vs.aspx): Visual C++を含む統合開発環境。
- [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools): コンパイラおよび関連ツールのみのパッケージ。

### 別名
- VC
- VC++
- MSVC
- cl

### <a name="visual_cpp_ver" href="#visual_cpp_ver">バージョンの表記</a>

このサイトでは Visual C++ 2010 などではなく、 Visual C++ 10.0 などと表記する。

| 製品名                                        | 製品バージョン | Visual C++ バージョン | `_MSC_VER` | `_MSC_FULL_VER` |
|-----------------------------------------------|----------------|-----------------------|----------|---------------|
| Visual Studio 2017                            | 15.5           |                       | 1912     |               |
| Visual Studio 2017                            | 15.4.5         | 14.1                  | 1911     | 191125547     |
| Visual Studio 2017                            | 15.4.4         | 14.1                  | 1911     | 191125542     |
| Visual Studio 2017                            | 15.3.3         | 14.1                  | 1911     | 191125507     |
| Visual Studio 2017 <a href="#cite-2">[^2]</a> | 15.0           | 14.1                  | 1910     | 191025017     |
| Visual Studio 2017 RC                         |                | 14.1                  | 1910     | 191024930     |
| Visual Studio 2015 Update3                    | 14.0           | 14.0                  | 1900     | 190024210     |
| Visual Studio 2015 Update2                    | 14.0           | 14.0                  | 1900     | 190023918     |
| Visual Studio 2015 Update2 RC                 | 14.0           | 14.0                  | 1900     | 190023824     |
| Visual Studio 2015 Update1                    | 14.0           | 14.0                  | 1900     | 190023506     |
| Visual Studio 2015                            | 14.0           | 14.0                  | 1900     | 190023026     |
| Visual Studio 2015 Preview/Beta/RC            | 14.0           | 14.0                  | 1900     |               |
| Visual Studio 2013 Nobemver CTP               | 12.0           | 12.0                  | 1800     | 180021114     |
| Visual Studio 2013 Update5                    | 12.0           | 12.0                  | 1800     | 180040629     |
| Visual Studio 2013 Update4                    | 12.0           | 12.0                  | 1800     | 180031101     |
| Visual Studio 2013 Update3                    | 12.0           | 12.0                  | 1800     | 180030723     |
| Visual Studio 2013 Update2                    | 12.0           | 12.0                  | 1800     | 180030501     |
| Visual Studio 2013 Update2 RC                 | 12.0           | 12.0                  | 1800     | 180030324     |
| Visual Studio 2013 Update1 <a href="#cite-1">[^1]</a> | 12.0           | 12.0                  | 1800     | 180021005     |
| Visual Studio 2013 RTM                        | 12.0           | 12.0                  | 1800     | 180021005     |
| Visual Studio 2013 RC                         | 12.0           | 12.0                  | 1800     | 180020827     |
| Visual Studio 2013 Preview                    | 12.0           | 12.0                  | 1800     | 180020617     |
| Visual Studio 2012 November CTP               | 11.0           | 11.0                  | 1700     | 170051025     |
| Visual Studio 2012 Update4                    | 11.0           | 11.0                  | 1700     | 170061030     |
| Visual Studio 2012 Update3                    | 11.0           | 11.0                  | 1700     | 170060610     |
| Visual Studio 2012 Update2                    | 11.0           | 11.0                  | 1700     | 170060315     |
| Visual Studio 2012 Update1                    | 11.0           | 11.0                  | 1700     | 170051106     |
| Visual Studio 2012 RTM                        | 11.0           | 11.0                  | 1700     | 170050727     |
| Visual Studio 2012 Beta/RC/PR                 | 11.0           | 11.0                  | 1700     |               |
| Visual Studio 2010 Update1                    | 10.0           | 10.0                  | 1600     | 160040219     |
| Visual Studio 2010 RTM                        | 10.0           | 10.0                  | 1600     | 160030319     |
| Visual Studio 2010 RC                         | 10.0           | 10.0                  | 1600     |               |
| Visual Studio 2010 Beta 2                     | 10.0           | 10.0                  | 1600     | 160021003     |
| Visual Studio 2010 Beta 1                     | 10.0           | 10.0                  | 1600     | 160020506     |
| Visual Studio 2008 Update1                    | 9.0            | 9.0                   | 1500     | 150030729     |
| Visual Studio 2008 RTM                        | 9.0            | 9.0                   | 1500     | 150021022     |
| Visual Studio 2008 RC                         | 9.0            | 9.0                   | 1500     |               |
| Visual Studio 2008 Beta 2                     | 9.0            | 9.0                   | 1500     | 150020706     |
| Visual Studio 2008 Beta 1                     | 9.0            | 9.0                   | 1500     |               |
| Visual Studio 2005 (Visual C++ 8.0) SP1       | 8.0            | 8.0                   | 1400     | 140050727     |
| Visual Studio 2005 (Visual C++ 8.0) RTM       | 8.0            | 8.0                   | 1400     | 140050320     |
| Visual Studio 2005 (Visual C++ 8.0) RC        | 8.0            | 8.0                   | 1400     |               |
| Visual Studio 2005 (Visual C++ 8.0) Beta 2    | 8.0            | 8.0                   | 1400     | 140050215     |
| Visual Studio 2005 (Visual C++ 8.0) Beta 1    | 8.0            | 8.0                   | 1400     | 140040607     |
| Visual Studio 2005 (Visual C++ 8.0) Preview   | 8.0            | 8.0                   | 1400     |               |
| Windows Server 2003 SP1 DDK (for AMD64)       |                |                       | 1400     | 140040310     |
| Visual Studio .NET 2003 (Visual C++ 7.1) SP1  | 7.1            | 7.1                   | 1310     | 13106030      |
| Windows Server 2003 SP1 DDK                   | 7.1            | 7.1                   | 1310     | 13104035      |
| Visual Studio .NET 2003 (Visual C++ 7.1) RTM  | 7.1            | 7.1                   | 1310     | 13103077      |
| Visual C++ Toolkit 2003                       | 7.1            | 7.1                   | 1310     | 13103052      |
| Visual Studio .NET 2003 (Visual C++ 7.1) Beta | 7.1            | 7.1                   | 1310     | 13102292      |
| Windows Server 2003 DDK                       |                |                       | 1310     | 13102179      |
| Visual Studio .NET 2002 (Visual C++ 7.0)      | 7.0            | 7.0                   | 1300     | 13009466      |
| Windows XP SP1 DDK                            |                |                       | 1300     | 13009176      |
| Visual Studio 6.0 (Visual C++ 6.0) SP5        | 6.0            | 6.0                   | 1200     | 12008804      |
| Visual Studio 97 (Visual C++ 5.0)             | 5.0            | 5.0                   | 1100     |               |
| Visual C++ 4.2                                | 4.2            | 4.2                   | 1020     |               |
| Visual C++ 4.1                                | 4.1            | 4.1                   | 1010     |               |
| Visual C++ 4.0                                | 4.0            | 4.0                   | 1000     |               |
| Visual C++ 2.0                                | 2.0            | 2.0                   | 900      |               |
| Visual C++ 1.0                                | 1.0            | 1.0                   | 800      |               |
| C/C++ Compiler 7.0                            |                |                       | 700      |               |
| C Compiler 6.0                                |                |                       | 600      |               |


- <a name="cite-1"></a>\[^1]: Visual Studio 2013 Update1では`_MSC_FULL_VER`は変更されなかった。  
  <https://blogs.msdn.microsoft.com/bharry/2014/01/20/vs-2013-1-update-1-is-available/#div-comment-125661>
- <a name="cite-2"></a>\[^2]: Visual Studio 2017では製品バージョンとVisual C++のバージョンが一致しない。  
  <https://qiita.com/Chironian/items/1432eb8b59eb2eefcd2d>


### C++14の機能を有効にする

- 14.0 Update 2までは、言語のバージョンを切り替える機能はなく、そのリリース時の最新言語バージョンが有効となる
- 14.0 Update 3からは、`/std:c++14`オプションを使用する。とくに指定しない場合はデフォルトでC++14が有効となる。この時`_MSVC_LANG`マクロが`201402`になる

### C++17の機能を有効にする

- 15.3からは、`/std:c++17`オプションを使用する。この時`_MSVC_LANG`マクロが`201703`になる

### 最新バージョンの言語機能を有効にする

- 14.0 Update 3からは、`/std:c++latest`オプションを使用する
- [-std (Specify Language Standard Version) | Microsoft Docs](https://docs.microsoft.com/en-us/cpp/build/reference/std-specify-language-standard-version)
- [Predefined Macros | Microsoft Docs](https://docs.microsoft.com/en-us/cpp/preprocessor/predefined-macros)
- [Standards version switches in the compiler](https://blogs.msdn.microsoft.com/vcblog/2016/06/07/standards-version-switches-in-the-compiler/)


