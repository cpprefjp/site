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

  // 右辺にルート名を持つルートディレクトリを含むパスを指定した場合、
  // 右辺を代入する動作となる
  {
    fs::path p = fs::path("foo") / "C:/bar";
    std::cout << "e : " << p << std::endl;
  }

  // 右辺にルート名を持たないルートディレクトリを含むパスを指定した場合、
  // 左辺のルート名以外が右辺で上書きされる
  {
    fs::path p = fs::path("C:foo") / "/bar";
    std::cout << "f : " << p << std::endl;
  }

  // 左辺と右辺が同じルート名を持つ相対パスの場合、
  // 左辺のパスに、右辺のルート名を除く相対パス部分が加算される
  {
    fs::path p = fs::path("C:foo") / "C:bar";
    std::cout << "g : " << p << std::endl;
  }

  // 左辺と右辺が違うルート名を持つパスの場合、
  // 右辺を代入する動作となる
  {
    fs::path p = fs::path("C:/foo") / "D:bar";
    std::cout << "h : " << p << std::endl;
  }
}
```

#### 出力
```
a : "foo\\bar"
b : "C:/foo/bar"
c : "foo\\"
d : "C:"
e : "C:/bar"
f : "C:/bar"
g : "C:foo\\bar"
h : "D:bar"
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]
