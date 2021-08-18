# operator/
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  path operator/(const path& x, const path& y);
}
```

## 概要
2つのパス要素を連結する。


## 効果
以下と等価の効果を持つ：

```cpp
return path(lhs) /= rhs;
```
* /=[link op_append_assign.md]


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
    fs::path p = fs::path("foo") / "bar";
    std::cout << "a : " << p << std::endl;
  }

  // 左辺の末尾にディレクトリ区切り文字が付いていてもよい
  {
    fs::path p = fs::path("foo/") / "bar";
    std::cout << "b : " << p << std::endl;
  }

  // 右辺が空のパスだった場合、ディレクトリ区切り文字だけ追加される
  {
    fs::path p = fs::path("foo") / "";
    std::cout << "c : " << p << std::endl;
  }

  // 右辺にルートディレクトリを含むパスを指定した場合、
  // 右辺を代入する動作となる
  {
    fs::path p = fs::path("foo") / "/bar";
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
    fs::path p = fs::path("foo") / "bar";
    std::cout << "a : " << p << std::endl;
  }

  // 左辺の末尾にディレクトリ区切り文字が付いていてもよい
  {
    fs::path p = fs::path("C:/foo/") / "bar";
    std::cout << "b : " << p << std::endl;
  }

  // 右辺が空のパスだった場合、ディレクトリ区切り文字だけ追加される
  {
    fs::path p = fs::path("foo") / "";
    std::cout << "c : " << p << std::endl;
  }

  // 左辺がルート名を持っていて、ルートディレクトリを持たず、
  // 右辺が空の場合、ディレクトリ区切り文字は追加されない
  {
    fs::path p = fs::path("C:") / "";
    std::cout << "d : " << p << std::endl;
  }

  // 右辺にルートディレクトリを含むパスを指定した場合、
  // 右辺を代入する動作となる
  {
    fs::path p = fs::path("foo") / "C:/bar";
    std::cout << "d : " << p << std::endl;
  }

  // 左辺と右辺のディレクトリ区切り文字の有無に関わらず連結される
  // (POSIXと違って、ルートディレクトリが`/`ではないため、
  //  右辺の開始をディレクトリ区切り文字にできる)
  {
    fs::path p = fs::path("foo") / "/bar";
    std::cout << "e : " << p << std::endl;
  }

  // 左辺がルート名を持ち、ルートディレクトリを持たないパスで、
  // 右辺に空のパスを指定した場合、ディレクトリ区切り文字は追加されない
  {
    fs::path p = fs::path("C:") / "";
    std::cout << "f : " << p << std::endl;
  }

  // 左辺がカレントディレクトリに依存した絶対パスの場合、
  // 相対パスを追加するとカレントディレクトリに依存したパス部分が右辺で上書きされる
  {
    fs::path p = fs::path("C:foo") / "/bar";
    std::cout << "g : " << p << std::endl;
  }

  // 左辺がカレントディレクトリに依存した絶対パスで、
  // 右辺もカレントディレクトリに依存した絶対パスの場合、
  // 左辺のパスに、右辺のカレントディレクトリに依存した部分が加算される
  {
    fs::path p = fs::path("C:foo") / "C:bar";
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
