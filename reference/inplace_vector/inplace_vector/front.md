# front
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr reference front();             // (1) C++26
constexpr const_reference front() const; // (2) C++26
```

## 概要
先頭要素への参照を取得する。

- (1) : 非`const`な文脈で先頭要素への参照を取得する。
- (2) : `const`な文脈で先頭要素への読み取り専用参照を取得する。


## 戻り値
先頭要素への参照


## 計算量
定数時間


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv = {3, 1, 4};
  int& x = iv.front();
  std::println("{}", x);
}
```
* front()[color ff0000]

### 出力
```
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
