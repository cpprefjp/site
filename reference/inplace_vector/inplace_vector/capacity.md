# capacity
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr size_type capacity() noexcept; // (1) C++26
```

## 概要
格納可能な最大の要素数を取得する。


## 戻り値
クラスのテンプレートパラメータ`N`を返す。


## 例外
投げない


## 計算量
定数時間


## 備考
この関数は`static`メンバ関数であり、常にコンパイル時定数`N`を返す。[`std::vector`](/reference/vector/vector.md)の[`capacity()`](/reference/vector/vector/capacity.md)と異なり、`inplace_vector`の容量は構築後に変化しない。


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv = {1, 2, 3};
  std::println("size: {}", iv.size());
  std::println("capacity: {}", iv.capacity());
}
```
* capacity()[color ff0000]
* iv.size()[link size.md]

### 出力
```
size: 3
capacity: 5
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
