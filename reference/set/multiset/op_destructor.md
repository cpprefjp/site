# デストラクタ
* set[meta header]
* std[meta namespace]
* multiset[meta class]
* function[meta id-type]

```cpp
~multiset();
```

## 概要
コンテナオブジェクトを破棄する。これは格納された要素のデストラクタを呼び出し、`multiset` によって確保された全てのアロケート済みストレージを解放する。


## 計算量
[`size()`](size.md) に対して線形時間（デストラクタ呼び出し）
