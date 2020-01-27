# codecvt
* locale[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class internT, class externT, class stateT>
  class codecvt : public locale::facet, public codecvt_base;
}
```
* locale::facet[link /reference/locale/locale/facet.md]
* codecvt_base[link /reference/locale/codecvt_base.md]

## 概要
(ここに、クラスの概要を記載する)

### publicメンバ関数

| 名前 | 説明 |
|----------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| `(constructor)` | コンストラクタ |
| `out` | 内部型から外部型に変換 |
| in | 外部型から内部型に変換 |
| `unshift` | 変換が不完全だった場合のために、変換の開始位置をずらす |
| `encoding` | 内部型の1文�への変換に必要な外部型の長さを取得する |
| `always_noconv` | 変換を行う必要がないか判定する |
| `length` | 内部型文�列への変換で消費される外部型文�列の長さを取得する |
| `max_length` | 内部型の1文�への変換に必要な外部型の最大の長さを取得する |

### 静的メンバ変数

| 名前                                                          | 説明 |
|---------------------------------------------------------------|------|
| `static` [`locale::id`](/reference/locale/locale/id.md) `id;` |      |

### protectedメンバ関数

| 名前 | 説明 |
|-------------------------------|--------------------------------------------------------------------------------------------|
| `(destructor)` | デストラクタ |
| `do_out` | 内部型から外部型に変換 |
| `do_in` | 外部型から内部型に変換 |
| `do_unshift` | 変換が不完全だった場合のために、変換の開始位置をずらす |
| `do_encoding` | 内部型の1文�への変換に必要な外部型の長さを取得する |
| `do_always_noconv` | 変換を行う必要がないか判定する |
| `do_length` | 内部型文�列への変換で消費される外部型文�列の長さを取得する |
| `do_max_length` | 内部型の1文�への変換に必要な外部型の最大の長さを取得する |

### メンバ型

| 名前 | 説明 |
|--------------------------|-------------------------------------------------|
| `intern_type` | 内部型 `internT` |
| `extern_type` | 外部型 `externT` |
| `state_type` | 変換の状態を表す型 `stateT` |

### 例

```cpp
```

### 出力
```
```

### 参照
