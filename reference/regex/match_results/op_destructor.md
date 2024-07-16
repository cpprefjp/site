# デストラクタ
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~match_results();
```

## 概要
`match_results` オブジェクトを破棄する。


## 効果
`match_results` が保持しているすべての要素に対してデストラクタを実行し、メモリを解放する。


## 計算量
線形時間


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 4.9.2 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
