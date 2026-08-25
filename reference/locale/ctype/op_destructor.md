# デストラクタ
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
protected:
  ~ctype(); // (1) C++98
```

## 概要
`ctype`ファセットオブジェクトを破棄する。


## 効果
`ctype<char>`の特殊化では、[コンストラクタ](op_constructor.md)の第1引数が非ヌルポインタであり、かつ第2引数が`true`であった場合、`delete[] `[`table()`](table.md)を実行する。


## 備考
このデストラクタは`protected`である。そのため`ctype`オブジェクトを、利用者が直接`delete`することはできない。

ファセットの寿命は、それを保持する[`locale`](/reference/locale/locale.md)オブジェクトによって管理される。

## バージョン
### 言語
- C++98


## 関連項目
- [`ctype`のコンストラクタ](op_constructor.md)
- [`locale::facet`](/reference/locale/locale/facet.md)
