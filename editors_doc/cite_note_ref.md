# cpprefjpにおける注釈・出典の貼り方

HTML5でもCommonMarkでも標準的な方法が示されていないが、注釈・出典を貼りたいという需要は�在するため、cpprefjpでは記法を統一した。

HTMLタグのうち、`a`, `sup`, `cite`タグを利用して実現する。

## 基本的な注釈・出典記法

もっとも一般的に利用を検討するべき注釈・出典記法がこれだ。

本文�に参照を貼り、ページ最下部に「注釈」「出典」の項を作ってそこに注釈・出典を書く。

- `N`, `${N}`: 1から始まる連番

|      | 参照元の見た目 | 参照先の見た目 | 参照元のid   | 参照先のid |
|------|----------------|----------------|--------------|------------|
| 注釈 | <sup>[注N]</sup>        | `N. ^`         | `note_ref-${N}` | `note-${N}`   |
| 出典 | <sup>[N]</sup>          | `N. ^`         | `cite_ref-${N}` | `cite-${N}`   |

### 例

```md
ありきたりな世界、と私がよく書くが、この元ネタは、
おもに工�系と�術系のMod<sup><a id="note_ref-1" href="#note-1">[注1]</a></sup>を導入したバージョン1.7.10のありきたりなMinecraftの実況をやっていきます<sup><a id="cite_ref-1" href="#cite-1">[1]</a></sup>、という動画内音声である。

## 注釈

1. **<a id="note-1" href="#note_ref-1">^</a>** MineCraftには、電気や金属・有機物加工などの概念を追加する工�系Mod、�法の概念を追加する�術系Modなどを代表に多種多様な改変を加えるModがある

## 出典

1. **<a id="cite-1" href="#cite_ref-1">^</a>** <cite>[【Minecraft】ありきたりな工�と�術S2 Part01【ゆっくり実況】 - ニコニコ動画](http://www.nicovideo.jp/watch/sm25261912)</cite>、再生位置 0:07 (2017-12-28 2:08 JST 閲覧)
```

### 表示例

>ありきたりな世界、と私がよく書くが、この元ネタは、
>おもに工�系と�術系のMod<sup><a id="note_ref-1" href="#note-1">[注1]</a></sup>を導入したバージョン1.7.10のありきたりなMinecraftの実況をやっていきます<sup><a id="cite_ref-1" href="#cite-1">[1]</a></sup>、という動画内音声である。
>
>## 注釈
>
>1. **<a id="note-1" href="#note_ref-1">^</a>** MineCraftには、電気や金属・有機物加工などの概念を追加する工�系Mod、�法の概念を追加する�術系Modなどを代表に多種多様な改変を加えるModがある
>
>## 出典
>
>1. **<a id="cite-1" href="#cite_ref-1">^</a>** <cite>[【Minecraft】ありきたりな工�と�術S2 Part01【ゆっくり実況】 - ニコニコ動画](http://www.nicovideo.jp/watch/sm25261912)</cite>、再生位置 0:07 (2017-12-28 2:08 JST 閲覧)

## 節ごとの注釈・出典記法

ページが極めて長く、また多くの節がある時に利用を検討するべき注釈・出典記法がこれだ。

本文�に参照を貼り、節最下部に、節のタイトルレベルより一つ小さい「注釈」「出典」の項を作って、そこに注釈・出典を書く。

- `N`, `${N}`: 1から始まる連番
- `${short_name}`: 適当にでっち上げたページ内で衝突しない節の名前

|      | 参照元の見た目 | 参照先の見た目 | 参照元のid   | 参照先のid |
|------|----------------|----------------|--------------|------------|
| 注釈 | <sup>[§注N]</sup>        | `N. ^`         | `note_ref-${short_name}-${N}` | `note-${short_name}-${N}`   |
| 出典 | <sup>[§N]</sup>          | `N. ^`         | `cite_ref-${short_name}-${N}` | `cite-${short_name}-${N}`   |

### 例

```md
## <a id="define-graph" href="#define-graph">グラフ型を定義する</a>

(前略)

以下は、無向グラフ<sup><a id="note_ref-define-graph-1-a" href="#note-define-graph-1">[§注1]</a></sup>を定義する例：

(�略)

有向グラフ<sup><a id="note_ref-define-graph-1-b" href="#note-define-graph-1">[§注1]</a></sup>で、辺に重みを付ける例：

(�略)

### 注釈

1. <a id="note-define-graph-1">^</a> <sup>[**a**](#note_ref-define-graph-1-a)</sup> <sup>[**b**](#note_ref-define-graph-1-b)</sup> 有向グラフ、無向グラフについては、[基本的なグラフ理論の復習](https://boostjp.github.io/archive/boost_docs/libs/graph/graph_theory_review.html)を参照
```

### 表示例

>## <a id="define-graph" href="#define-graph">グラフ型を定義する</a>
>
>(前略)
>
>以下は、無向グラフ<sup><a id="note_ref-define-graph-1-a" href="#note-define-graph-1">[§注1]</a></sup>を定義する例：
>
>(�略)
>
>有向グラフ<sup><a id="note_ref-define-graph-1-b" href="#note-define-graph-1">[§注1]</a></sup>で、辺に重みを付ける例：
>
>(�略)
>
>### 注釈
>
>1. <a id="note-define-graph-1">^</a> <sup>[**a**](#note_ref-define-graph-1-a)</sup> <sup>[**b**](#note_ref-define-graph-1-b)</sup> 有向グラフ、無向グラフについては、[基本的なグラフ理論の復習](https://boostjp.github.io/archive/boost_docs/libs/graph/graph_theory_review.html)を参照

## 表に対する注釈記法

表の�み方に関わる注釈をつけるときに検討するべき注釈記法がこれだ。

表�に参照を貼り、表の直後に注釈・出典を書く。

- `N`, `${N}`: 1から始まる連番
- `M`, `${M}`: 1からはじまる表番号の連番

|      | 参照元の見た目 | 参照先の見た目 | 参照元のid   | 参照先のid |
|------|----------------|----------------|--------------|------------|
| 注釈 | <sup>†N</sup>        | `N. ^`         | `note_ref-t${M}-${N}` | `note-t${M}-${N}`   |

### 例

```md
| コンテナ | ○○操作の計算量 | ××操作の計算量 |
|--|--|--|
| std::vector | O(1) | O(1) |
| std::list | (O(n)<sup><a id="note_ref-t1-1" href="#note-t1-1">†1</a></sup>) | O(1) |
| bar | O(1) | O(1) |
| baz | O(1) | O(1) |

1. **<a id="note-t1-1" href="#note_ref-t1-1">^</a>** 直接はサポートされないが、`std::distance`, etc を用いて実現可能
```

### 表示例

>| コンテナ | ○○操作の計算量 | ××操作の計算量 |
>|--|--|--|
>| std::vector | O(1) | O(1) |
>| std::list | (O(n)<sup><a id="note_ref-t1-1" href="#note-t1-1">†1</a></sup>) | O(1) |
>| bar | O(1) | O(1) |
>| baz | O(1) | O(1) |
>
>1. **<a id="note-t1-1" href="#note_ref-t1-1">^</a>** 直接はサポートされないが、`std::distance`, etc を用いて実現可能

## その他

同じ参照先に対する参照元が複数あるときは、参照元のid末尾に小文�のアルファベット`a`から連続で文�を割り当て、参照先の見た目は

>N. ^ <sup>**a**</sup> <sup>**b**</sup> 本文

のようにする。

出典のページタイトル・書籍タイトルなどは`cite`タグで囲う。
