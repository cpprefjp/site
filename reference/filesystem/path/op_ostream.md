# operator<<
* filesystem[meta header]
* std::filesystem[meta namespace]
* path[meta class]
* function template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  template <class CharT, class Traits>
  std::basic_ostream<CharT, Traits>&
    operator<<(std::basic_ostream<CharT, Traits>& os, const path& p); // (1) C++17
}

template <class CharT, class Traits>
friend std::basic_ostream<CharT, Traits>&
  operator<<(std::basic_ostream<CharT, Traits>& os, const path& p);   // (2) C++20
```

## 概要
ストリームに出力する。

`path`オブジェクトにおいては、システムのパスフォーマットかつ、ダブルクォーテーション囲みでパス文�列が出力される。


## 戻り値
以下と�価：

```cpp
return os << quoted(p.string<CharT, Traits>());
```
* quoted[link /reference/iomanip/quoted.md]
* p.string[link string.md]


## 備考
- この関数は、C++20で非メンバ関数から、friendメンバ関数に変更された。そのため、`std::filesystem::operator<<`という完全名の指定では呼び出せず、ADLによって呼び出すことになる


## 例
### POSIXベースシステムでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "a/b/c";
  std::cout << p << std::endl;
}
```

#### 出力
```
"a/b/c"
```

### Windowsでの例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "a/b/c";
  std::cout << p << std::endl;
}
```

#### 出力
```
"a\b\c"
```

Windowsでの例は、Visual C++が�式にファイルシステムライブラリをサポートしていないことから、未検証のサンプルコード・出力となっている。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [P1601R0 Recommendations for Specifying "Hidden Friends"](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1601r0.pdf)
- [Hidden Friends - yohhoyの日記](https://yohhoy.hatenadiary.jp/entry/20190531/p1)
- [The Power of Hidden Friends in C++ - Just Software Solutions](https://www.justsoftwaresolutions.co.uk/cplusplus/hidden-friends.html)
- [LWG 2989. `path`'s stream insertion operator lets you insert everything under the sun](https://cplusplus.github.io/LWG/issue2989)
