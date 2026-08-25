# デストラクタ
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]

```cpp
protected:
  ~time_get(); // (1) C++98
```

## 概要
`time_get`ファセットオブジェクトを破棄する。


## 備考
このデストラクタは`protected`である。そのため`time_get`オブジェクトを、利用者が直接`delete`することはできない。

ファセットの寿命は、それを保持する[`locale`](/reference/locale/locale.md)オブジェクトによって管理される。

## バージョン
### 言語
- C++98


## 関連項目
- [`time_get`のコンストラクタ](op_constructor.md)
- [`locale::facet`](/reference/locale/locale/facet.md)
