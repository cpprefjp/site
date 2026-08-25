# デストラクタ
* locale[meta header]
* std[meta namespace]
* moneypunct_byname[meta class]
* function[meta id-type]

```cpp
protected:
  ~moneypunct_byname(); // (1) C++98
```

## 概要
`moneypunct_byname`ファセットオブジェクトを破棄する。


## 備考
このデストラクタは`protected`である。そのため`moneypunct_byname`オブジェクトを、利用者が直接`delete`することはできない。

ファセットの寿命は、それを保持する[`locale`](/reference/locale/locale.md)オブジェクトによって管理される。

## バージョン
### 言語
- C++98


## 関連項目
- [`moneypunct_byname`のコンストラクタ](op_constructor.md)
- [`moneypunct`](/reference/locale/moneypunct.md)
