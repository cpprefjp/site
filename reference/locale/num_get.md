# num_get
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, class InputIterator = istreambuf_iterator<charT> >
  class num_get : public locale::facet;
}
```
* istreambuf_iterator[link /reference/iterator/istreambuf_iterator.md]
* locale::facet[link /reference/locale/locale/facet.md]

## 概要
`num_get`は、入力ストリームから数値・真偽値・ポインタを読み取り、解析するためのロケールファセットである。[`basic_istream`](/reference/istream/basic_istream.md)の数値入力演算子`operator>>`は、このファセットを介して入力の解析を行う。

テンプレートパラメータ`InputIterator`は、入力に使用するイテレータの型を表し、既定では[`istreambuf_iterator`](/reference/iterator/istreambuf_iterator.md)`<charT>`である。

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|-----------------------|
| `(constructor)` | コンストラクタ |
| [`get`](num_get/get.md) | 数値の解析 |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` |  |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------|
| `(destructor)` | デストラクタ |
| [`do_get`](num_get/do_get.md) | 数値の解析 |

### メンバ型

| 名前 | 説明 |
|------------------------|--------------------------------------------------------|
| `char_type` | 文字型 `charT` |
| `iter_type` | 入力のイテレータ型 `InputIterator` |

### 例
```cpp
```

### 出力
```
```

### 参照
