# 処理系
- [Clang](#clang)
- [GNU Compiler Collection](#gcc)
- [Intel C++ Compiler](#icc)
- [Microsoft Visual C++](#visual_cpp)

## 本サイトにおける処理系バージョンに記載
本サイトのリファレンスページでは、「処理系」の項目にバージョン番号を記載している。これは、処理系がその機能をサポート開始した厳密なバージョンではなく、リファレンス執�者が動作確認できたバージョンである。

古くからサポートされている機能だが、古い処理系を入手することが難しい場合などがあるため、本サイトではこのようなルールになっている。


## <a id="clang" href="#clang">Clang</a>
このサイトでは Clang と呼ぶ。「クラン(グ)」と�む。

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
- Clang 6.0以降は、C++14がデフォルトとなる。デフォルトバージョンのコンパイルオプションは`-std=gnu++14`


### C++17の機能を有効にする
- Clang 3.5から4.0までは、`-std=c++1z`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1z`オプションもある。
- Clang 5.0以降は、`-std=c++17`オプションを使用する(以前までのオプションも使用できる)。
    - GNU拡張を有効にする`-std=gnu++17`オプションもある。


### C++20の機能を有効にする
- Clang 6.0以降は、`-std=c++2a`オプションを使用する。


## <a id="gcc" href="#gcc">GNU Compiler Collection</a>
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
- GCC 4.7以降は、`-std=c++11`オプションを使用する (旧オプションは非推奨)。
    - GNU拡張を有効にする`-std=gnu++11`オプションもある。


### C++14の機能を有効にする
- GCC 4.8から4.9までは、`-std=c++1y`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1y`オプションもある。
- GCC 5.1以降は、`-std=c++14`オプションを使用する (旧オプションは非推奨)。
    - GNU拡張を有効にする`-std=gnu++14`オプションもある。
- GCC 6.1以降は、C++14がデフォルトとなる。デフォルトバージョンのコンパイルオプションは`-std=gnu++14`


### C++17の機能を有効にする
- GCC 6.1以降は、`-std=c++1z`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++1z`オプションもある。
- GCC 7.1以降は、`-std=c++17`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++17`オプションもある (旧オプションは非推奨)。


### C++20の機能を有効にする
- GCC 8.1以降は、`-std=c++2a`オプションを使用する。
    - GNU拡張を有効にする`-std=gnu++2a`オプションもある。


## <a id="icc" href="#icc">Intel C++ Compiler</a>
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


## <a id="visual_cpp" href="#visual_cpp">Microsoft Visual C++</a>
このサイトでは Visual C++ と呼ぶ。Visual Studio 2012 以降、Visual C++は独立した製品名ではなくなり製品Visual Studioのみに含まれるようになったが、当サイトでは製品に含まれているコンポーネント名としてのVisual C++を採用する。

- [Visual Studio - Microsoft Developer Tools](https://www.visualstudio.com/ja-jp/visual-studio-homepage-vs.aspx): Visual C++を含む統合開発環境。
- [Build Tools for Visual Studio](https://visualstudio.microsoft.com/ja/downloads/): コマンドラインのみからコンパイルするために必要な環境を構築するもの。

### 別名
- VC
- VC++
- MSVC
- cl

### <a id="visual_cpp_ver" href="#visual_cpp_ver">バージョンの表記</a>

以下に当サイトにおけるバージョン表記と、製品・バージョン�の対応を示す。

| 表記          | 製品名 [Visual Studio バージョン] <sup><a id="note_ref-t1-1" href="#note-t1-1">†1</a></sup> | VC++ バージョン <sup><a id="note_ref-t1-2" href="#note-t1-2">†2</a></sup> | `_MSC_VER` | `_MSC_FULL_VER` |
|---------------|----------------------------------------|-----------------|------------|-----------------|
| 2019 Update 4 | Visual Studio 2019 バージョン 16.4.0   | 14.24           | 1924       | 192428314       |
| 2019 Update 3 | Visual Studio 2019 バージョン 16.3.2   | 14.23           | 1923       | 192328105       |
| 2019 Update 2 | Visual Studio 2019 バージョン 16.2.3   | 14.22           | 1922       | 192227905       |
| 2019 Update 1 | Visual Studio 2019 バージョン 16.1.2   | 14.21           | 1921       | 192127702       |
| 2019          | Visual Studio 2019 バージョン 16.0.0   | 14.20           | 1920       | 192027508       |
| 2017 Update 9 | Visual Studio 2017 バージョン 15.9.11  | 14.16           | 1916       | 191627030       |
| 2017 Update 9 | Visual Studio 2017 バージョン 15.9.7   | 14.16           | 1916       | 191627027       |
| 2017 Update 9 | Visual Studio 2017 バージョン 15.9.5   | 14.16           | 1916       | 191627026       |
| 2017 Update 9 | Visual Studio 2017 バージョン 15.9.4   | 14.16           | 1916       | 191627025       |
| 2017 Update 9 | Visual Studio 2017 バージョン 15.9.1   | 14.16           | 1916       | 191627023       |
| 2017 Update 9 | Visual Studio 2017 バージョン 15.9.0   | 14.16           | 1916       |                 |
| 2017 Update 8 | Visual Studio 2017 バージョン 15.8.0   | 14.15           | 1915       |                 |
| 2017 Update 7 | Visual Studio 2017 バージョン 15.7.5   | 14.14           | 1914       | 191426433       |
| 2017 Update 7 | Visual Studio 2017 バージョン 15.7.3   | 14.14           | 1914       | 191426430       |
| 2017 Update 7 | Visual Studio 2017 バージョン 15.7.2   | 14.14           | 1914       | 191426429       |
| 2017 Update 7 | Visual Studio 2017 バージョン 15.7.1   | 14.14           | 1914       | 191426428       |
| 2017 Update 6 | Visual Studio 2017 バージョン 15.6.7   | 14.13           | 1913       | 191326132       |
| 2017 Update 6 | Visual Studio 2017 バージョン 15.6.6   | 14.13           | 1913       | 191326131       |
| 2017 Update 6 | Visual Studio 2017 バージョン 15.6.4   | 14.13           | 1913       | 191326129       |
| 2017 Update 6 | Visual Studio 2017 バージョン 15.6.3   | 14.13           | 1913       | 191326129       |
| 2017 Update 6 | Visual Studio 2017 バージョン 15.6.2   | 14.13           | 1913       | 191326128       |
| 2017 Update 6 | Visual Studio 2017 バージョン 15.6.1   | 14.13           | 1913       | 191326128       |
| 2017 Update 6 | Visual Studio 2017 バージョン 15.6.0   | 14.13           | 1913       | 191326128       |
| 2017 Update 5 | Visual Studio 2017 バージョン 15.5.7   | 14.12           | 1912       | 191225835       |
| 2017 Update 5 | Visual Studio 2017 バージョン 15.5.6   | 14.12           | 1912       | 191225835       |
| 2017 Update 5 | Visual Studio 2017 バージョン 15.5.4   | 14.12           | 1912       | 191225834       |
| 2017 Update 5 | Visual Studio 2017 バージョン 15.5.3   | 14.12           | 1912       | 191225834       |
| 2017 Update 5 | Visual Studio 2017 バージョン 15.5.2   | 14.12           | 1912       | 191225831       |
| 2017 Update 4 | Visual Studio 2017 バージョン 15.4.5   | 14.11           | 1911       | 191125547       |
| 2017 Update 4 | Visual Studio 2017 バージョン 15.4.4   | 14.11           | 1911       | 191125542       |
| 2017 Update 3 | Visual Studio 2017 バージョン 15.3.3   | 14.11           | 1911       | 191125507       |
| 2017 Update 2 <sup><a id="note_ref-t1-3-a" href="#note-t1-3">†3</a></sup> | Visual Studio 2017 バージョン 15.2     | 14.10           | 1910       | 191025017       |
| 2017 Update 1 <sup><a id="note_ref-t1-3-b" href="#note-t1-3">†3</a></sup> | Visual Studio 2017 バージョン 15.1     | 14.10           | 1910       | 191025017       |
| 2017          | Visual Studio 2017 バージョン 15.0     | 14.10 <sup><a id="note_ref-t1-4" href="#note-t1-4">†4</a></sup> | 1910       | 191025017       |
| 2015 Update 3 | Visual Studio 2015 Update 3 [14.0]     | 14.0            | 1900       | 190024210       |
| 2015 Update 2 | Visual Studio 2015 Update 2 [14.0]     | 14.0            | 1900       | 190023918       |
| 2015 Update 1 | Visual Studio 2015 Update 1 [14.0]     | 14.0            | 1900       | 190023506       |
| 2015          | Visual Studio 2015          [14.0]     | 14.0            | 1900       | 190023026       |
| 2013 Update 5 | Visual Studio 2013 Update 5 [12.0]     | 12.0            | 1800       | 180040629       |
| 2013 Update 4 | Visual Studio 2013 Update 4 [12.0]     | 12.0            | 1800       | 180031101       |
| 2013 Update 3 | Visual Studio 2013 Update 3 [12.0]     | 12.0            | 1800       | 180030723       |
| 2013 Update 2 | Visual Studio 2013 Update 2 [12.0]     | 12.0            | 1800       | 180030501       |
| 2013 Update 1 <sup><a id="note_ref-t1-3-c" href="#note-t1-3">†3</a></sup> | Visual Studio 2013 Update 1 [12.0]     | 12.0            | 1800       | 180021005       |
| 2013          | Visual Studio 2013          [12.0]     | 12.0            | 1800       | 180021005       |
| 2012 Update 4 | Visual Studio 2012 Update 4 [11.0]     | 11.0            | 1700       | 170061030       |
| 2012 Update 3 | Visual Studio 2012 Update 3 [11.0]     | 11.0            | 1700       | 170060610       |
| 2012 Update 2 | Visual Studio 2012 Update 2 [11.0]     | 11.0            | 1700       | 170060315       |
| 2012 Update 1 | Visual Studio 2012 Update 1 [11.0]     | 11.0            | 1700       | 170051106       |
| 2012          | Visual Studio 2012          [11.0]     | 11.0            | 1700       | 170050727       |
| 2010 SP1      | Visual Studio 2010 SP1      [10.0]<br/>Visual C++ 2010 SP1     [10.0] | 10.0 | 1600 | 160040219 |
| 2010          | Visual Studio 2010          [10.0]<br/>Visual C++ 2010         [10.0] | 10.0 | 1600 | 160030319 |
| 2008 SP1      | Visual Studio 2008 SP1      [9.0] <br/>Visual C++ 2008 SP1     [9.0]  | 9.0  | 1500 | 150030729 |
| 2008          | Visual Studio 2008          [9.0] <br/>Visual C++ 2008         [9.0]  | 9.0  | 1500 | 150021022 |
| 2005 SP1      | Visual Studio 2005 SP1      [8.0] <br/>Visual C++ 2005 SP1     [8.0]  | 8.0  | 1400 | 140050727 |
| 2005          | Visual Studio 2005          [8.0] <br/>Visual C++ 2005         [8.0]  | 8.0  | 1400 | 140050320 |
|               | Windows Server 2003 SP1 DDK (for AMD64)                               |      | 1400 | 140040310 |
| 2003 SP1      | Visual Studio .NET 2003 SP1 [7.1]<br/>Visual C++ .NET 2003 SP1 [7.1]  | 7.1  | 1310 | 13106030  |
|               | Windows Server 2003 SP1 DDK                                           |      | 1310 | 13104035  |
| 2003          | Visual Studio .NET 2003     [7.1]<br/>Visual C++ .NET 2003     [7.1]  | 7.1  | 1310 | 13103077  |
|               | Visual Studio Toolkit 2003  [7.1]                                     | 7.1  | 1310 | 13103052  |
|               | Windows Server 2003 DDK                                               |      | 1310 | 13102179  |
| 2002          | Visual Studio .NET 2002     [7.0]<br/>Visual C++ .NET 2002     [7.0]  | 7.0  | 1300 | 13009466  |
|               | Windows XP SP1 DDK                                                    |      | 1300 | 13009176  |
| 6.0 SP6       | Visual Studio 6.0 SP6<br/>Visual C++ 6.0 SP6 | 6.0       | 1200       | 12008804        |
| 6.0 SP5       | Visual Studio 6.0 SP5<br/>Visual C++ 6.0 SP5 | 6.0       | 1200       | 12008804        |
|               | Visual Studio 97 [5.0]<br/>Visual C++ 5.0 | 5.0          | 1100       |                 |
|               | Visual C++ 4.2                         | 4.2             | 1020       |                 |
|               | Visual C++ 4.1                         | 4.1             | 1010       |                 |
|               | Visual C++ 4.0                         | 4.0             | 1000       |                 |
|               | Visual C++ 2.0                         | 2.0             | 900        |                 |
|               | Visual C++ 1.0                         | 1.0             | 800        |                 |
|               | Microsoft C/C++ 7.0                    |                 | 700        |                 |
|               | Microsoft C 6.0                        |                 | 600        |                 |

1. **<a id="note-t1-1" href="#note_ref-t1-1">^</a>** 製品名の列にはVisual C++コンパイラを含む実際に入手する製品の名称を示す。製品のエディション (Express/Standard/Professional/Enterprise/Community 他) は省略する。Visual Studioの製品バージョンは、製品名に現れていないときは `[ ～ ]` 内に記す。製品バージョンは、2017以降、メインメニューの [ヘルプ]-[Microsoft Visual Studio のバージョン情報] から確認できるものを指す。
2. **<a id="note-t1-2" href="#note_ref-t1-2">^</a>** VC++バージョンの列にはVisual C++ツールセットのバージョンを記述する。この表では特にVisual C++を入れた時に既定で選択されるツールセットのみについて扱う。
3. <a id="note-t1-3">^</a> <sup>[**a**](#note_ref-t1-3-a)</sup> <sup>[**b**](#note_ref-t1-3-b)</sup> <sup>[**c**](#note_ref-t1-3-c)</sup> IDEのみ修�され、コンパイラ、ヘッダー、ライブラリ�は変更されなかった。
	- [C++17 Features And STL Fixes In VS 2017 15.3 | Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2017/08/11/c17-features-and-stl-fixes-in-vs-2017-15-3/) - "*After VS 2017 RTM, the 15.1 and 15.2 updates improved the IDE. The 15.3 update improves both the IDE and the toolset.*"
	- [Description of Visual Studio 2013 Update 1](https://support.microsoft.com/en-us/help/2911573/description-of-visual-studio-2013-update-1)
4. **<a id="note-t1-4" href="#note_ref-t1-4">^</a>** 2017は2015とバイナリ互換が保たれているためメジャーバージョンアップは行われなかった。その結果、製品バージョンとVisual C++バージョンが一致しなくなった。
  [Binary Compatibility and Pain-free Upgrade: Why Moving to Visual Studio 2017 is almost “too easy”](https://blogs.msdn.microsoft.com/vcblog/2017/03/07/binary-compatibility-and-pain-free-upgrade-why-moving-to-visual-studio-2017-is-almost-too-easy/)

- 2015以降、Visual Studioの既定のインストールではVisual C++は入らなくなった。Visual StudioのインストーラでVisual C++コンポーネントを選択する必要がある。
  [Visual Studio 2015 の Visual C++](https://docs.microsoft.com/ja-JP/previous-versions/60k1461a(v=vs.140)?redirectedfrom=MSDN) の [�告] を参照。
- 2017 Update 5からside-by-sideがサポートされ、一つの製品内で同時に複数のVisual C++ツールセットを選択できるようになった。
  [Side-by-side minor version MSVC toolsets in Visual Studio 2017 | Visual C++ Team Blog](https://blogs.msdn.microsoft.com/vcblog/2017/11/15/side-by-side-minor-version-msvc-toolsets-in-visual-studio-2017/)


### C++11の機能を有効にする

- C++11は常に有効である

### C++14の機能を有効にする

- C++14は常に有効である
- 2015 Update 3から`/std:c++14`オプションが導入されたが既定値でありC++14を無効化する機能は提供されていない。`_MSVC_LANG`マク�の値は`201402`になる

### C++17の機能を有効にする

- 2015 Update 2以前に実装された機能については、互換性の観点から常に有効である
- 2015 Update 3以降に実装された機能については、`/std:c++17`オプションを使用する。`_MSVC_LANG`マク�の値は`201703`になる

### 最新バージョンの言語機能を有効にする

- 2015 Update 3以降は`/std:c++latest`オプションを使用する
- [-std (Specify Language Standard Version) | Microsoft Docs](https://docs.microsoft.com/en-us/cpp/build/reference/std-specify-language-standard-version)
- [Predefined Macros | Microsoft Docs](https://docs.microsoft.com/en-us/cpp/preprocessor/predefined-macros)
- [Standards version switches in the compiler](https://blogs.msdn.microsoft.com/vcblog/2016/06/07/standards-version-switches-in-the-compiler/)
