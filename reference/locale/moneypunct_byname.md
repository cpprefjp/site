# moneypunct_byname
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT, bool International = false>
  class moneypunct_byname : public moneypunct<charT, International>
}
```
* moneypunct[link /reference/locale/moneypunct.md]

## 概要
(ここに、クラスの概要を記載する)

### メンバ関数

| | |
|----------------------------|-----------------------|
| `(constructor)` | コンストラクタ |

### 静的メンバ関数

| | |
|---------------------------|--------------------|
| `(destructor)` | デストラクタ |

### メンバ型

| | |
|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `pattern` | 金額のフォーマット型 [`money_base`](/reference/locale/money_base.md)`::pattern` |
| `string_type` | 文字列型 [`basic_string`](/reference/string/basic_string.md)`<charT>` |

### 例
```cpp
```

### 出力
```
```

### 参照
