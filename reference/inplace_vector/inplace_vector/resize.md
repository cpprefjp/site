# resize
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr void resize(size_type sz);              // (1) C++26
constexpr void resize(size_type sz, const T& c);  // (2) C++26
```

## 概要
要素数を変更する。

- (1) : 要素数を`sz`に変更する。増加分は値初期化される。
- (2) : 要素数を`sz`に変更する。増加分は`c`のコピーで初期化される。


## 効果
- `sz`が現在の[`size()`](size.md)より小さい場合、後ろから[`size()`](size.md) `- sz`個の要素を削除する。
- `sz`が現在の[`size()`](size.md)より大きい場合:
    - (1) : `sz -` [`size()`](size.md)個の値初期化された要素を追加する。
    - (2) : `sz -` [`size()`](size.md)個の`c`のコピーを追加する。


## 例外
`sz > N`の場合、[`std::bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。


## 戻り値
なし


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  // 増加
  {
    std::inplace_vector<int, 10> iv = {3, 1, 4};
    iv.resize(5);
    for (int x : iv) std::print("{} ", x);
    std::println("");
  }

  // 減少
  {
    std::inplace_vector<int, 10> iv = {3, 1, 4};
    iv.resize(1);
    for (int x : iv) std::print("{} ", x);
    std::println("");
  }
}
```
* resize[color ff0000]

### 出力
```
3 1 4 0 0
3
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 参照
- [P0843R14 `inplace_vector`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0843r14.html)
