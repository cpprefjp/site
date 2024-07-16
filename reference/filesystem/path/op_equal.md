# operator==
* filesystem[meta header]
* std::filesystem[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  bool operator==(const path& lhs, const path& rhs) noexcept; // (1) C++17

  class path {
  public:
    friend bool operator==(const path& lhs, const path& rhs) noexcept; // (1) C++20
  };
}
```

## 概要
等値比較を行う


## 戻り値
- (1):
    - C++17
    ```cpp
    return !(lhs < rhs) && !(rhs < lhs);
    ```

    - C++20
    ```cpp
    return lhs.compare(rhs) == 0;
    ```
    * compare[link compare.md]


## 備考
- (1) : `lhs.`[`compare`](compare.md)`(rhs) == 0`と等価 (C++17)
- この演算子はパス要素列の等価性を判定するため、パスが意味的に同一かどうかを判定することはできない。パス文字列の意味的な等価性判定には、[`filesystem::equivalent()`](/reference/filesystem/equivalent.md)を使用する
- この演算子により、`operator!=`が使用可能になる (C++20)


## 例
```cpp example
#include <cassert>
#include <filesystem>

namespace fs = std::filesystem;

int main()
{
  fs::path a = "a/b/c";
  fs::path b = "a/b/d";

  assert(a == a);
  assert(!(a == b));

  // 正規化は考慮されない。
  // ファイルシステムとしてのパスの等価性ではなく、
  // パス文字列の同値性が比較されれる
  fs::path c = "a/../b/c";
  assert(!(a == c));
}
```
* ==[color ff0000]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
