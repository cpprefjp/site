# operator/=
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
path& operator/=(const path& p);        // (1)

template <class Source>
path& operator/=(const Source& source); // (2)
```

## 概要
パス要素を加算する。


## 効果
- (1) :
    - `p.`[`is_absolute()`](is_absolute.md) `|| (p.`[`has_root_name()`](has_root_name.md) `&& p.`[`root_name()`](root_name.md) `!=` [`root_name()`](root_name.md)`)`であれば、`p`を`*this`に代入する。
        - `p`が絶対パスであれば`*this`にパス連結できないため、置き換えとする
    - そうでなければ、`*this`を以下のように変更する：
        1. `p`が[ルートディレクトリを持っている](has_root_directory.md)場合、`*this`から[ルートディレクトリ](root_directory.md)と[相対パス](relative_path.md)を削除する
        2. `p`がルートディレクトリを持っておらず、絶対パスである、もしくはファイル名を持っている場合、環境推奨のディレクトリ区切り文字を`*this`に追加する
        3. [ルート名](root_name.md)を除いた`p`を`*this`に追加する
- (2) :
    - `return operator/=(path(source))`と等価


## 戻り値
`*this`


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // 通常のユースケース
  // 後ろにディレクトリを加算する
  {
    fs::path p = "foo";
    p /= "bar";
    std::cout << "a : " << p << std::endl;
  }

  // 左辺の末尾にディレクトリ区切り文字が付いていてもよい
  {
    fs::path p = "foo/";
    p /= "bar";
    std::cout << "b : " << p << std::endl;
  }

  // 右辺が空のパスだった場合、ディレクトリ区切り文字だけ追加される
  {
    fs::path p = "foo";
    p /= "";
    std::cout << "c : " << p << std::endl;
  }

  // 右辺にルートディレクトリを含むパスを指定した場合、
  // 右辺を代入する動作となる
  {
    fs::path p = "foo";
    p /= "/bar";
    std::cout << "d : " << p << std::endl;
  }
}
```

#### 出力
```
a : "foo/bar"
b : "foo/bar"
c : "foo/"
d : "/bar"
```

### Windowsでの例
```cpp
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  // 通常のユースケース
  // 後ろにディレクトリを加算する
  {
    fs::path p = "foo";
    p /= "bar";
    std::cout << "a : " << p << std::endl;
  }

  // 左辺の末尾にディレクトリ区切り文字が付いていてもよい
  {
    fs::path p = "C:/foo/";
    p /= "bar";
    std::cout << "b : " << p << std::endl;
  }

  // 右辺が空のパスだった場合、ディレクトリ区切り文字だけ追加される
  {
    fs::path p = "foo";
    p /= "";
    std::cout << "c : " << p << std::endl;
  }

  // 左辺がルート名を持っていて、ルートディレクトリを持たず、
  // 右辺が空の場合、ディレクトリ区切り文字は追加されない
  {
    fs::path p = "C:";
    p /= "";
    std::cout << "d : " << p << std::endl;
  }

  // 右辺にルートディレクトリを含むパスを指定した場合、
  // 右辺を代入する動作となる
  {
    fs::path p = "foo";
    p /= "C:/bar";
    std::cout << "d : " << p << std::endl;
  }

  // 左辺と右辺のディレクトリ区切り文字の有無に関わらず連結される
  // (POSIXと違って、ルートディレクトリが`/`ではないため、
  //  右辺の開始をディレクトリ区切り文字にできる)
  {
    fs::path p = "foo";
    p /= "/bar";
    std::cout << "e : " << p << std::endl;
  }

  // 左辺がルート名を持ち、ルートディレクトリを持たないパスで、
  // 右辺に空のパスを指定した場合、ディレクトリ区切り文字は追加されない
  {
    fs::path p = "C:";
    p /= "";
    std::cout << "f : " << p << std::endl;
  }

  // 左辺がカレントディレクトリに依存した絶対パスの場合、
  // 相対パスを追加するとカレントディレクトリに依存したパス部分が右辺で上書きされる
  {
    fs::path p = "C:foo";
    p /= "/bar";
    std::cout << "g : " << p << std::endl;
  }

  // 左辺がカレントディレクトリに依存した絶対パスで、
  // 右辺もカレントディレクトリに依存した絶対パスの場合、
  // 左辺のパスに、右辺のカレントディレクトリに依存した部分が加算される
  {
    fs::path p = "C:foo";
    p /= "C:bar";
    std::cout << "h : " << p << std::endl;
  }
}
```

#### 出力
```
a : "foo\bar"
b : "C:\foo"
c : "foo\"
d : "C:\bar"
e : "foo\bar"
f : "C:"
g : "C:\bar"
h : "C:foo\bar"
```

Windowsでの例は、Visual C++が正式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7

### 備考
- GCC 8.1 (SVN) の`operator/=`では、ルートディレクトリを持つパスを加算すると、左辺が削除されないバグがある
    - [Bug 84159 - `filesystem::path::operator/=` with has root directory path](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=84159)

