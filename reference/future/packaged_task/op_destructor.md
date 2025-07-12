# デストラクタ
* future[meta header]
* std[meta namespace]
* packaged_task[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~packaged_task();
```

## 概要
`packaged_task`オブジェクトの破棄


## 効果
1. まず共有状態が準備完了状態([`future_status::ready`](../future_status.md))でなければ、error conditionとして[`broken_promise`](../future_errc.md)を持つ[`future_error`](../future_error.md)例外オブジェクトを格納したのち、準備完了状態にする。
2. 共有状態を解放する。

## 例
```cpp
```

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified]


## 参照
