# money_get
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class InputIterator = istreambuf_iterator<charT> >
  class money_get : public locale::facet;
}
```
* istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]

## 概要
(ここに、クラスの概要を記載する)

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| `(constructor)` | コンストラクタ |
| `get` | 金額の解析 |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` |  |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| `(destructor)` | デストラクタ |
| `do_get` | 金額の解析 |

### メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `iter_type` | 入力のイテレータ型 `InputIterator` |
| `string_type` | 文字列型 [`basic_string`](/reference/string/basic_string.md)`<charT>` |

### 例
```cpp
```

### 出力
```
```

### 参照
