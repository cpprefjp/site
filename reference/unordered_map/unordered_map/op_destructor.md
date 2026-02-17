# デストラクタ
* unordered_map[meta header]
* std[meta namespace]
* unordered_map[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~unordered_map();           // (1) C++11
constexpr ~unordered_map(); // (1) C++26
```

## 概要
`unordered_map` が保持している全ての要素に対してデストラクタを実行し、メモリを解放する。


## 例外
投げない


## 計算量
線形時間


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++:](/implementation.md#visual_cpp) ?

## 関連項目

| 名前                                  | 説明           |
|---------------------------------------|----------------|
| [`(constructor)`](op_constructor.md) | コンストラクタ |
| [`operator=`](op_assign.md)         | 代入演算子     |


## 参照
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
