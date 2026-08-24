# デストラクタ
* locale[meta header]
* std[meta namespace]
* num_get[meta class]
* function[meta id-type]

```cpp
protected:
  ~num_get();
```

## 概要
`num_get`ファセットオブジェクトを破棄する。


## 備考
このデストラクタは`protected`であり、仮想関数ではない。そのため`num_get`オブジェクトを、利用者が直接`delete`することはできない。

ファセットの寿命は、それを保持する[`locale`](/reference/locale/locale.md)オブジェクトによって管理される。参照カウント（[コンストラクタ](op_constructor.md)の`refs`引数）が`0`のファセットは、それを保持する最後の[`locale`](/reference/locale/locale.md)オブジェクトが破棄されるときに破棄される。


## バージョン
### 言語
- C++98


## 関連項目
- [`num_get`のコンストラクタ](op_constructor.md)
- [`locale::facet`](/reference/locale/locale/facet.md)
