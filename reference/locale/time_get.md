# time_get
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class InputIterator = istreambuf_iterator<charT> >
  class time_get : public locale::facet, public time_base;
}
```
* istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]
* time_base[link /reference/locale/time_base.md]

## 概要

(ここに、クラスの概要を記載する)

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------------------|
| `(constructor)` | コンストラクタ |
| `date_order` | 日付の表記順を取得する |
| `get_time` | 時間の解析 |
| `get_date` | 日付の解析 |
| `get_weekday` | 曜日の解析 |
| `get_monthname` | 月名の解析 |
| `get_year` | 年の解析 |
| `get` | 日時の解析 |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` |  |

### protectedメンバ関数

| 名前 | 説明 |
|-------------------------------|-----------------------------------|
| `(destructor)` | デストラクタ |
| `do_date_order` | 日付の表記順を取得する |
| `do_get_time` | 時間の解析 |
| `do_get_date` | 日付の解析 |
| `do_get_weekday` | 曜日の解析 |
| `do_get_monthname` | 月名の解析 |
| `do_get_year` | 年の解析 |
| `do_get` | 日時の解析 |

### メンバ型

| 名前 | 説明 |
|-----------------------------------------------------------------------|---------------------------------------------------------|
| `char_type` | 文�型 `charT` |
| `iter_type` | 入力のイテレータ型 `InputIterator` |

### 例
```cpp
```

### 出力
```
```

### 参照
