# コンストラクタ
* locale[meta header]
* std[meta namespace]
* messages[meta class]
* function[meta id-type]

```cpp
explicit messages(size_t refs = 0); // (1) C++98
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
`messages`ファセットオブジェクトを構築する。


## 効果
基底クラスを[`locale::facet`](/reference/locale/locale/facet.md)`(refs)`で初期化する。


## 備考
`refs`は、このファセットの参照カウントの初期値である。

- `refs == 0`の場合、このファセットを保持する[`locale`](/reference/locale/locale.md)オブジェクトが破棄されるとき、ファセットも破棄される
- `refs == 1`の場合、[`locale`](/reference/locale/locale.md)オブジェクトの破棄によってファセットが破棄されることはない

## バージョン
### 言語
- C++98


## 関連項目
- [`locale::facet`](/reference/locale/locale/facet.md)
- [`messages_byname`](/reference/locale/messages_byname.md)
