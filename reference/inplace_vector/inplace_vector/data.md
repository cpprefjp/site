# data
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr T* data() noexcept;             // (1) C++26
constexpr const T* data() const noexcept; // (2) C++26
```

## 概要
配列の先頭へのポインタを返す。

- (1) : 非`const`な文脈で配列の先頭へのポインタを取得する。
- (2) : `const`な文脈で配列の先頭への読み取り専用ポインタを取得する。


## 戻り値
内部に保持する配列の先頭要素へのポインタを返す。空の場合でも呼び出し自体は問題ないが、戻り値のポインタを間接参照してはならない。


## 例外
投げない


## 計算量
定数時間


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv = {3, 1, 4};

  int* p = iv.data();
  std::println("{}", *p);

  ++p;
  std::println("{}", *p);
}
```
* data()[color ff0000]

### 出力
```
3
1
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
