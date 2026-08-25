# デストラクタ
* locale[meta header]
* std[meta namespace]
* collate_byname[meta class]
* function[meta id-type]

```cpp
protected:
  ~collate_byname(); // (1) C++98
```

## 概要
`collate_byname`ファセットオブジェクトを破棄する。


## 備考
このデストラクタは`protected`である。そのため`collate_byname`オブジェクトを、利用者が直接`delete`することはできない。

ファセットの寿命は、それを保持する[`locale`](/reference/locale/locale.md)オブジェクトによって管理される。

## バージョン
### 言語
- C++98


## 関連項目
- [`collate_byname`のコンストラクタ](op_constructor.md)
- [`collate`](/reference/locale/collate.md)
