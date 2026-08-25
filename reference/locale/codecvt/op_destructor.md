# デストラクタ
* locale[meta header]
* std[meta namespace]
* codecvt[meta class]
* function[meta id-type]

```cpp
protected:
  ~codecvt(); // (1) C++98
```

## 概要
`codecvt`ファセットオブジェクトを破棄する。


## 備考
このデストラクタは`protected`である。そのため`codecvt`オブジェクトを、利用者が直接`delete`することはできない。

ファセットの寿命は、それを保持する[`locale`](/reference/locale/locale.md)オブジェクトによって管理される。

## バージョン
### 言語
- C++98


## 関連項目
- [`codecvt`のコンストラクタ](op_constructor.md)
- [`locale::facet`](/reference/locale/locale/facet.md)
