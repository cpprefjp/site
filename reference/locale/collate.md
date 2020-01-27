# collate
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT>
  class collate : public locale::facet;
}
```
* locale::facet[link /reference/locale/locale/facet.md]

## 概要
(ここに、クラスの概要を記載する)

### メンバ関数

| 名前 | 説明 |
|----------------------------|--------------------------------------------|
| `(constructor)` | コンストラクタ |
| `compare` | 文�列を比較する |
| `transform` | 文�の範囲を文�列に変換する |
| `hash` | 文�範囲のハッシュ値を求める |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------------------------------|
| `(destructor)` | デストラクタ |
| `do_compare` | 文�列を比較する |
| `do_transform` | 文�の範囲を文�列に変換する |
| `do_hash` | 文�範囲のハッシュ値を求める |

### メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `char_type` | 文�型 `charT` |
| `string_type` | 文�列型 [`basic_string`](/reference/string/basic_string.md)`<charT>` |

### 例
```cpp
```

### 出力
```
```

### 参照
