# append
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
template <class Source>
path& append(const Source& source);                    // (1)

template <class InputIterator>
path& append(InputIterator first, InputIterator last); // (2)
```

## 概要
パス要素を加算する。


## 効果
- (1) : `return operator/=(path(source))`と等価
- (2) : `return operator/=(path(first, last))`と等価


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
    p.append("bar");
    std::cout << "a : " << p << std::endl;
  }

  // 左辺の末尾にディレクトリ区切り文字が付いていてもよい
  {
    fs::path p = "foo/";
    p.append("bar");
    std::cout << "b : " << p << std::endl;
  }

  // 右辺が空のパスだった場合、ディレクトリ区切り文字だけ追加される
  {
    fs::path p = "foo";
    p.append("");
    std::cout << "c : " << p << std::endl;
  }

  // 右辺にルートディレクトリを含むパスを指定した場合、
  // 右辺を代入する動作となる
  {
    fs::path p = "foo";
    p.append("/bar");
    std::cout << "d : " << p << std::endl;
  }
}
```
* append[color ff0000]

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
    p.append("bar");
    std::cout << "a : " << p << std::endl;
  }

  // 左辺の末尾にディレクトリ区切り文字が付いていてもよい
  {
    fs::path p = "C:/foo/";
    p.append("bar");
    std::cout << "b : " << p << std::endl;
  }

  // 右辺が空のパスだった場合、ディレクトリ区切り文字だけ追加される
  {
    fs::path p = "foo";
    p.append("");
    std::cout << "c : " << p << std::endl;
  }

  // 左辺がルート名を持っていて、ルートディレクトリを持たず、
  // 右辺が空の場合、ディレクトリ区切り文字は追加されない
  {
    fs::path p = "C:";
    p.append("");
    std::cout << "d : " << p << std::endl;
  }

  // 右辺にルート名を持つルートディレクトリを含むパスを指定した場合、
  // 右辺を代入する動作となる
  {
    fs::path p = "foo";
    p.append("C:/bar");
    std::cout << "e : " << p << std::endl;
  }

  // 右辺にルート名を持たないルートディレクトリを含むパスを指定した場合、
  // 左辺のルート名以外が右辺で上書きされる
  {
    fs::path p = "C:foo";
    p.append("/bar");
    std::cout << "f : " << p << std::endl;
  }

  // 左辺と右辺が同じルート名を持つ相対パスの場合、
  // 左辺のパスに、右辺のルート名を除く相対パス部分が加算される
  {
    fs::path p = "C:foo";
    p.append("C:bar");
    std::cout << "g : " << p << std::endl;
  }

  // 左辺と右辺が違うルート名を持つパスの場合、
  // 右辺を代入する動作となる
  {
    fs::path p = "C:foo";
    p.append("D:bar");
    std::cout << "h : " << p << std::endl;
  }
}
```
* append[color ff0000]

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

### 備考
- GCC 8.1 (SVN) の`operator/=`では、ルートディレクトリを持つパスを加算すると、左辺が削除されないバグがある
    - [Bug 84159 - `filesystem::path::operator/=` with has root directory path](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=84159)

