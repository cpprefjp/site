# do_date_order
* locale[meta header]
* std[meta namespace]
* time_get[meta class]
* function[meta id-type]

```cpp
protected:
  virtual dateorder do_date_order() const; // (1) C++98
```
* dateorder[link /reference/locale/time_base.md]

## 概要
日付の要素（日・月・年）の並び順を取得する。[`date_order()`](date_order.md)から呼び出される仮想関数である。


## 戻り値
日・月・年で構成される日付書式について、要素の推奨される並び順を示す列挙値。

書式指定子`'x'`が指定する日付書式が、それ以外の可変要素（ユリウス日、週番号、曜日など）を含む場合は`no_order`を返す。


## 備考
この関数は一般的な書式に対する利便性のためだけのものであり、妥当なロケールに対しても`no_order`を返しうる。

## バージョン
### 言語
- C++98


## 関連項目
- [`time_get::date_order`](date_order.md)
- [`time_base`](/reference/locale/time_base.md)
