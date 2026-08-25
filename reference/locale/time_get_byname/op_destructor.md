# デストラクタ
* locale[meta header]
* std[meta namespace]
* time_get_byname[meta class]
* function[meta id-type]

```cpp
protected:
  ~time_get_byname(); // (1) C++98
```

## 概要
`time_get_byname`ファセットオブジェクトを破棄する。


## 備考
このデストラクタは`protected`である。そのため`time_get_byname`オブジェクトを、利用者が直接`delete`することはできない。

ファセットの寿命は、それを保持する[`locale`](/reference/locale/locale.md)オブジェクトによって管理される。

## バージョン
### 言語
- C++98


## 関連項目
- [`time_get_byname`のコンストラクタ](op_constructor.md)
- [`time_get`](/reference/locale/time_get.md)
