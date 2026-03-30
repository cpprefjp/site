# unchecked_push_back
* inplace_vector[meta header]
* std[meta namespace]
* inplace_vector[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr reference unchecked_push_back(const T& x); // (1) C++26
constexpr reference unchecked_push_back(T&& x);      // (2) C++26
```

## 概要
容量チェックなしで末尾へ要素を追加する。

- (1) : `x`をコピーして末尾に追加する。
- (2) : `x`をムーブして末尾に追加する。


## 事前条件
[`size()`](size.md) `< N`であること。この条件を満たさない場合、未定義動作となる。


## 効果
`x`を末尾に追加する。


## 戻り値
追加された要素への参照


## 計算量
定数時間


## 備考
この関数は容量チェックを行わないため、[`push_back()`](push_back.md)よりも高速に動作しうる。呼び出し前に容量に空きがあることが確実な場合に使用する。


## 例
```cpp example
#include <print>
#include <inplace_vector>

int main()
{
  std::inplace_vector<int, 5> iv;

  // 容量に空きがあることが確実な場合に使用
  for (int i = 0; i < 5; ++i) {
    iv.unchecked_push_back(i);
  }

  for (int x : iv) {
    std::println("{}", x);
  }
}
```
* unchecked_push_back[color ff0000]

### 出力
```
0
1
2
3
4
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
