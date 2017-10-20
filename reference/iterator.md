# iterator
* iterator[meta header]

`<iterator>`ヘッダでは、イテレータに関する機能群を提供する。  
イテレータは日本語では反復子とも呼ばれ、配列やコンテナのような範囲を横断する手段として使用できる。  

C++標準ライブラリのイテレータは、以下のように階層的に定義される。  
この階層はC++言語機能の継承と同じように見なせる。たとえば、入力イテレータと前方向イテレータはis a関係が成り立っており、前方向イテレータは入力イテレータと見なすことができる。

![](https://raw.github.com/cpprefjp/image/master/reference/iterator/iterators.png)


## イテレータの情報

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`iterator_traits`](iterator/iterator_traits.md) | イテレータに関する型情報(class template) | |
| [`iterator`](iterator/iterator.md) | イテレータを定義するための基本クラス(class template) | C++17から非推奨 |
| [`input_iterator_tag`](iterator/iterator_tag.md) | 入力イテレータを表すタグ(class) | |
| [`output_iterator_tag`](iterator/iterator_tag.md) | 出力イテレータを表すタグ(class) | |
| [`forward_iterator_tag`](iterator/iterator_tag.md) | 前方向イテレータを表すタグ(class) | |
| [`bidirectional_iterator_tag`](iterator/iterator_tag.md) | 双方向イテレータを表すタグ(class) | |
| [`random_access_iterator_tag`](iterator/iterator_tag.md) | ランダムアクセスイテレータを表すタグ(class) | |


## イテレータの進行と距離

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`advance`](iterator/advance.md) | イテレータを進める(function template) | |
| [`distance`](iterator/distance.md) | イテレータ間の距離を求める(function template) | |
| [`next`](iterator/next.md) | イテレータを進める(function template)       | C++11 |
| [`prev`](iterator/prev.md) | イテレータを後方に進める(function template) | C++11 |


## 逆順イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`reverse_iterator`](iterator/reverse_iterator.md) | 逆方向に進むイテレータアダプタ(class template) | |
| [`make_reverse_iterator`](iterator/make_reverse_iterator.md) | `reverse_iterator`オブジェクトを作るヘルパ関数(function template) | C++14 |


## 挿入イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`back_insert_iterator`](iterator/back_insert_iterator.md) | 末尾に要素を挿入する出力イテレータアダプタ(class template) | |
| [`back_inserter`](iterator/back_inserter.md) | `back_insert_iterator`オブジェクトを作るヘルパ関数(function template) | |
| [`front_insert_iterator`](iterator/front_insert_iterator.md) | 先頭に要素を挿入する出力イテレータアダプタ(class template) | |
| [`front_inserter`](iterator/front_inserter.md) | `front_insert_iterator`オブジェクトを作るヘルパ関数(function template) | |
| [`insert_iterator`](iterator/insert_iterator.md) | 任意の位置に要素を挿入する出力イテレータアダプタ(class template) | |
| [`inserter`](iterator/inserter.md) | `insert_iterator`オブジェクトを作るヘルパ関数(function template) | |


## 要素を移動するイテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`move_iterator`](iterator/move_iterator.md) | 間接参照時にムーブするイテレータアダプタ(class template) | C++11 |
| [`make_move_iterator`](iterator/make_move_iterator.md) | `move_iterator`オブジェクトを作るヘルパ関数(function template) | C++11 |


## ストリームイテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`istream_iterator`](iterator/istream_iterator.md) | 入力ストリームイテレータ(class template) | |
| [`ostream_iterator`](iterator/ostream_iterator.md) | 出力ストリームイテレータ(class template) | |
| [`istreambuf_iterator`](iterator/istreambuf_iterator.md) | 入力ストリームバッファイテレータ(class template) | |
| [`ostreambuf_iterator`](iterator/ostreambuf_iterator.md) | 出力ストリームバッファイテレータ(class template) | |


## 先頭イテレータと末尾イテレータ

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|------------------------------------------|-------|
| [`begin`](iterator/begin.md) | 範囲の先頭を指すイテレータを取得する(function template) | C++11 |
| [`end`](iterator/end.md) | 範囲の末尾の次を指すイテレータを取得する(function template) | C++11 |
| [`cbegin`](iterator/cbegin.md) | 範囲の先頭を指す読み取り専用イテレータを取得する(function template) | C++14 |
| [`cend`](iterator/cend.md) | 範囲の末尾の次を指す読み取り専用イテレータを取得する(function template) | C++14 |
| [`rbegin`](iterator/rbegin.md) | 範囲の末尾を指す逆イテレータを取得する(function template) | C++14 |
| [`rend`](iterator/rend.md) | 範囲の先頭の前を指す逆イテレータを取得する(function template) | C++14 |
| [`crbegin`](iterator/crbegin.md) | 範囲の末尾を指す読み取り専用逆イテレータを取得する(function template) | C++14 |
| [`crend`](iterator/crend.md) | 範囲の先頭の前を指す読み取り専用逆イテレータを取得する(function template) | C++14 |


