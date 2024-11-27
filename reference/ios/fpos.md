# fpos
* ios[meta header]
* std[meta namespace]
* class template[meta id-type]

```cpp
namespace std {
  template <class stateT>
  class fpos;
}
```

`fpos`は、ファイル上の位置を表現するクラスである。
概念的には、stateTによる変換状態と整数によるオフセットでファイル上の位置を表現するクラスである。

多くの場合、stateTとしては`std::mbstate_t`が使用される。とくに、`<iosfwd>`ヘッダでは、以下の別名型が定義されている。

```cpp
template<class state> class fpos;
using streampos  = fpos<char_traits<char>::state_type>;
using wstreampos = fpos<char_traits<wchar_t>::state_type>;
using u8streampos = fpos<char_traits<char8_t>::state_type>;
using u16streampos = fpos<char_traits<char16_t>::state_type>;
using u32streampos = fpos<char_traits<char32_t>::state_type>;
```

`char`、`wchar_t`、`char8_t`、`char16_t`、`char32_t`型について`char_traits<charT>::state_type`は`std::mbstate_t`の別名である。

## メンバ関数
### 構築・破棄

| 名前                      | 説明             | 対応バージョン |
|---------------------------|------------------|----------------|
| [`state`](fpos/state.md.nolink) | 状態の取得・設定 |                |

## 要件
`fpos`に関連して、以下の操作が可能であることが要求される。

| 式・文          | 説明                                       | アサーション・その他注釈       |
|-----------------|--------------------------------------------|--------------------------------|
| `P(i)`          | intからの一時オブジェクトの作成            | `p == P(i)`                    |
| `P p(i);`       | intからのオブジェクトの作成                | 事後条件: `p == P(i)`          |
| `P p = i;`      | 〃                                         | 〃                             |
| `P(o)`          | オフセットからの（一時）オブジェクトの生成 |                                |
| `O(p)`          | オフセットへの変換                         | `P(O(p)) == p`                 |
| `p == q`        | 比較                                       | 結果の型はboolに変換可能である |
| `p != q`        | 〃                                         | 〃                             |
| `q = p + o`     | 正値のオフセット                           | `q - o == p`                   |
| `p += o`        | 〃                                         | 〃                             |
| `q = p - o`     |                                            | `q + o == p`                   |
| `q -= o`        |                                            | 〃                             |
| `o = p - q`     | fpos同士の差                               | `q + o == p`                   |
| `streamsize(o)` | 型変換                                     | `streamsize(O(sz)) == sz`      |
| `O(sz)`         | 型変換                                     | 〃                             |

- P: fpos&lt;T&gt;である型
- p, q: fpos&lt;T&gt;である型の値
- O: streamoff型
- o: streamoff型の値
- sz: streamsize型の値
- i: int型の値

なお、`P(O(-1))`はエラー値である。`basic_istream`/`basic_ostream`/`basic_streambuf`では以下のように扱われる。

- 戻り値としてこの値が返されれば、操作の失敗を表す。
- 引数としてこの値が渡された場合、未定義動作を引き起こす。
