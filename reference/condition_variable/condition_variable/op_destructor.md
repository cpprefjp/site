# デストラクタ
* condition_variable[meta header]
* std[meta namespace]
* condition_variable[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
~condition_variable();
```

## 概要
`condition_variable`オブジェクトの破棄を行う


## 要件
`*this`を参照している全てのスレッドがブ�ッ�ングされていないこと。

つまり、デストラクタが呼び出される前に、`*this`の`condition_variable`オブジェクトを待機している全てのスレッドに起床通知を送らなければならない。


## 効果
条件変数を破棄する


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
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013


## 参照


