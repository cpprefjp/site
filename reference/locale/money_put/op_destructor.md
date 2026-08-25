# デストラクタ
* locale[meta header]
* std[meta namespace]
* money_put[meta class]
* function[meta id-type]

```cpp
protected:
  ~money_put(); // (1) C++98
```

## 概要
`money_put`ファセットオブジェクトを破棄する。


## 備考
このデストラクタは`protected`である。そのため`money_put`オブジェクトを、利用者が直接`delete`することはできない。

ファセットの寿命は、それを保持する[`locale`](/reference/locale/locale.md)オブジェクトによって管理される。

## バージョン
### 言語
- C++98


## 関連項目
- [`money_put`のコンストラクタ](op_constructor.md)
- [`locale::facet`](/reference/locale/locale/facet.md)
