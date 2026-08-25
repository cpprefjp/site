# コンストラクタ
* locale[meta header]
* std[meta namespace]
* ctype[meta class]
* function[meta id-type]

```cpp
// 主テンプレート
explicit ctype(size_t refs = 0);           // (1) C++98

// ctype<char>の特殊化
explicit ctype(const mask* tbl = nullptr,
               bool del = false,
               size_t refs = 0);           // (2) C++98
```
* mask[link /reference/locale/ctype_base.md]
* size_t[link /reference/cstddef/size_t.md]

## 概要
`ctype`ファセットオブジェクトを構築する。

- (1) : 主テンプレートのコンストラクタ
- (2) : `ctype<char>`の特殊化のコンストラクタ。文字の分類テーブル`tbl`を指定する


## 事前条件
- (2) : `tbl == nullptr`であるか、`[tbl, tbl + table_size)`が妥当な範囲であること


## 効果
- (1), (2) : 基底クラスを[`locale::facet`](/reference/locale/locale/facet.md)`(refs)`で初期化する
- (2) : `tbl`が非ヌルポインタの場合、[`table()`](table.md)はその値を返すようになる。ヌルポインタの場合、[`table()`](table.md)は[`classic_table()`](classic_table.md)を返す


## 備考
- (2) : `del`が`true`であり、かつ`tbl`が非ヌルポインタである場合、[デストラクタ](op_destructor.md)で`delete[] `[`table()`](table.md)が実行される
- (1), (2) : `refs`は、このファセットの参照カウントの初期値である
    - `refs == 0`の場合、このファセットを保持する[`locale`](/reference/locale/locale.md)オブジェクトが破棄されるとき、ファセットも破棄される
    - `refs == 1`の場合、[`locale`](/reference/locale/locale.md)オブジェクトの破棄によってファセットが破棄されることはない


## バージョン
### 言語
- C++98


## 関連項目
- [`locale::facet`](/reference/locale/locale/facet.md)
- [`ctype_byname`](/reference/locale/ctype_byname.md)
- [`ctype::table`](table.md)
