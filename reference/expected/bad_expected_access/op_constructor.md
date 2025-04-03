# コンストラクタ
* expected[meta header]
* function[meta id-type]
* std[meta namespace]
* bad_expected_access[meta class]
* cpp23[meta cpp]

```cpp
explicit bad_expected_access(E e);           // (1) C++23
constexpr explicit bad_expected_access(E e); // (1) C++26

bad_expected_access(const bad_expected_access&);           // (2) C++23
constexpr bad_expected_access(const bad_expected_access&); // (2) C++26

bad_expected_access(bad_expected_access&&);           // (3) C++23
constexpr bad_expected_access(bad_expected_access&&); // (3) C++26
```
* bad_expected_access[link ../bad_expected_access.md]

## 概要
- (1) : エラー値を[`std::move`](/reference/utility/move.md)`(e)`で初期化する。
- (2) : コピーコンストラクタ。
- (3) : ムーブコンストラクタ。


## 例
```cpp example
#include <cassert>
#include <expected>

int main()
{
  std::bad_expected_access<int> ex{42};
  assert(ex.error() == 42);
}
```
* std::bad_expected_access[color ff0000]
* error()[link error.md]

### 出力
```
```


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 16.0 [mark verified]
- [GCC](/implementation.md#gcc): 12.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P0323R12 std::expected](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p0323r12.html)
- [P3378R2 `constexpr` exception types](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3378r2.html)
    - C++26で`constexpr`対応した
