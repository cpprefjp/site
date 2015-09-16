#regex_traits (C++11)
* regex[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class CharT>
  struct regex_traits;
}
```

##概要


##メンバ関数

###構築・破棄

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `(constructor)` | コンストラクタ | C++11 |
| `~regex_traits() = default;` | デストラクタ | C++11 |
| `regex_traits& operator=(const regex_traits&) = default;`<br/> `regex_traits& operator=(regex_traits&&) = default;` | 代入演算子 | C++11 |


###変換

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `translate` | 与えられた文字と同等の文字を取得する | C++11 |
| `translate_nocase` | 与えられた文字列と大文字・小文字を区別せずに等価な文字列を取得する | C++11 |
| `transform` | 与えられた範囲を、並べ替えのキーとして使用する、文字のシーケンスに変換する | C++11 |
| `transform_primary` | 与えられた文字の範囲を、並べ替えのキーとして使用する、大文字・小文字を区別しない文字のシーケンスに変換する | C++11 |
| `lookup_collatename` | 与えられた文字の範囲に対応する照合名を取得する | C++11 |
| `lookup_classname` | 与えられた文字の範囲に対応するクラス名を取得する | C++11 |
| `istype` | 文字が特定のクラスに属しているかを判定する | C++11 |
| `value` | 文字の整数表現を取得する | C++11 |
| `imbue` | ロケールを設定する | C++11 |
| `getloc` | ロケールを取得する | C++11 |


##静的メンバ関数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `length` | 文字列の長さを取得する | C++11 |


##例
```cpp
```

###出力
```
```


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.9.0, 4.9.1, 4.9.2, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

