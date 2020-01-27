# messages
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class charT>
  class messages : public locale::facet, public messages_base;
}
```
* locale::facet[link /reference/locale/locale/facet.md]
* messages_base[link /reference/locale/messages_base.md]

## 概要
(ここに、クラスの概要を記載する)

### publicメンバ関数

| 名前 | 説明 |
|----------------------------|--------------------------------------|
| `(constructor)` | コンストラクタ |
| `open` | 翻訳カタ�グを開く |
| `get` | 翻訳メッセージを取得する |
| `close` | 翻訳カタ�グを閉じる |

### 静的メンバ変数

| 名前 | 説明 |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` |  |

### protectedメンバ関数

| 名前 | 説明 |
|---------------------------|--------------------------------------|
| `(destructor)` | デストラクタ |
| `do_open` | 翻訳カタ�グを開く |
| `do_get` | 翻訳メッセージを取得する |
| `do_close` | 翻訳カタ�グを閉じる |

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
