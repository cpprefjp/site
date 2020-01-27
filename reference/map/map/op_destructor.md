# デストラクタ
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]

```cpp
~map();
```

## 概要
コンテナオブジェクトを破棄する。これは格納された要素のデストラクタを呼び出し、`map` によって確保された全てのア�ケート済みストレージを解放する。


## 計算量
[`size()`](/reference/map/map/size.md) に対して線形時間（デストラクタ呼び出し）


