# max_size
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
static constexpr size_type max_size() noexcept; // (1) C++26
```

## 概要
格納可能な最大の要素数を取得する。


## 戻り値
テンプレートパラメータ`N`を返す。


## 例外
投げない


## 計算量
定数時間


## 備考
この関数は`static`メンバ関数である。[`capacity()`](capacity.md)と同じ値を返す。


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv;
  std::println("{}", iv.max_size());
}
```
* max_size()[color ff0000]

### 出力
```
5
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
