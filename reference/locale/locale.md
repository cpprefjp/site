# locale
* locale[meta header]
* std[meta namespace]
* class[meta id-type]

```cpp
namespace std {
  class locale;
}
```

## 概要
`locale`は、地域化のデータを表現するクラスである。`locale`はファセットの集合を保持しており、`has_facet()`と`use_facet()`の関数テンプレートで`locale`が保持しているファセットを調査・取得できる。ファセットは[`facet`](locale/facet.md)の派生クラスである。

### メンバ関数

| 名前 | 説明 |
|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| [`(constructor)`](locale/op_constructor.md) | コンストラクタ |
| `(destructor)` | デストラクタ |
| `operator=` | 代入演算子 |
| `combine` | 合成 |
| `name` | 名前の取得 |
| [`operator==`](locale/op_equal.md) | 等値比較 |
| [`operator!=`](locale/op_not_equal.md) | 非等値比較 |
| `operator()` | 照合オブジェクトを使用した文字列比較 |

### 静的メンバ関数

| 名前 | 説明 |
|----------------------|---------------------------------------------------|
| `global` | グローバルロケールの設定 |
| `classic` | Cロケールを表すオブジェクトの取得 |

### メンバ型

| 名前 | 説明 |
|-------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|
| `category` | ビットマスク型 `int`。 `locale`が保持するファセットを識別する用途。 |
| [`id`](locale/id.md) | `facet`の識別用のクラス |
| [`facet`](locale/facet.md) | ファセットの基底クラス |

### メンバ定数

| 名前 | 説明 |
|------|------|
| `static const category none = 0;` | ファセットなし |
| `static const category collate = 0x10;` | 照合ファセット |
| `static const category ctype = 0x20;` | 文字分類ファセット |
| `static const category monetary = 0x40;` | 金額ファセット |
| `static const category numeric = 0x80;` | 数値ファセット |
| `static const category time = 0x100;` | 日時ファセット |
| `static const category messages = 0x200;` | メッセージファセット |
| `static const category all =   collate`<br/> <code>                            &#x7C; </code>`ctype`<br/> <code>                            &#x7C; monetary</code><br/> <code>                            &#x7C; numeric</code><br/> <code>                            &#x7C; time</code><br/> <code>                            &#x7C; messages;</code> | 全てのファセット |


## 例
```cpp
```

### 出力
```
```

### 参照
