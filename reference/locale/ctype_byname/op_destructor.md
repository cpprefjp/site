# デストラクタ
* locale[meta header]
* std[meta namespace]
* ctype_byname[meta class]
* function[meta id-type]

```cpp
protected:
  ~ctype_byname(); // (1) C++98
```

## 概要
`ctype_byname`ファセットオブジェクトを破棄する。


## 備考
このデストラクタは`protected`である。そのため`ctype_byname`オブジェクトを、利用者が直接`delete`することはできない。

ファセットの寿命は、それを保持する[`locale`](/reference/locale/locale.md)オブジェクトによって管理される。

## バージョン
### 言語
- C++98


## 関連項目
- [`ctype_byname`のコンストラクタ](op_constructor.md)
- [`ctype`](/reference/locale/ctype.md)
