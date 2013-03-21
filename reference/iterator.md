<iterator>ヘッダでは、イテレータに関する機能群を提供する。
イテレータは日本語では反復子とも呼ばれ、配列やコンテナのような範囲を横断する手段として使用できる。

C++標準ライブラリのイテレータは、以下のように階層的に定義される。
この階層はC++言語機能の継承と同じように見なせる。たとえば、入力イテレータと前方向イテレータはis a関係が成り立っており、前方向イテレータは入力イテレータと見なすことができる。

![](https://raw.github.com/cpprefjp/image/master/reference/iterator/iterators.png)




| | |
|----------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| [`iterator_traits`](https://sites.google.com/site/cpprefjp/reference/iterator/iterator_traits) | イテレータに関する型情報(class template) |
| [`iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/iterator) | イテレータを定義するための基本クラス(class template) |
| [`input_iterator_tag`](https://sites.google.com/site/cpprefjp/reference/iterator/iterator_tag) | 入力イテレータを表すタグ(class) |
| [`output_iterator_tag`](https://sites.google.com/site/cpprefjp/reference/iterator/iterator_tag) | 出力イテレータを表すタグ(class) |
| [`forward_iterator_tag`](https://sites.google.com/site/cpprefjp/reference/iterator/iterator_tag) | 前方向イテレータを表すタグ(class) |
| <code>[bidirectional_iterator_tag](https://sites.google.com/site/cpprefjp/reference/iterator/iterator_tag)
</code> | 双方向イテレータを表すタグ(class) |
| [`random_access_iterator_tag`](https://sites.google.com/site/cpprefjp/reference/iterator/iterator_tag) | ランダムアクセスイテレータを表すタグ(class) |
| [`advance`](https://sites.google.com/site/cpprefjp/reference/iterator/advance) | イテレータを進める(function template) |
| [`distance`](https://sites.google.com/site/cpprefjp/reference/iterator/distance) | イテレータ間の距離を求める(function template) |
| [`next`](https://sites.google.com/site/cpprefjp/reference/iterator/next) | イテレータを進める(function template) (C++11) |
| [`prev`](https://sites.google.com/site/cpprefjp/reference/iterator/prev) | イテレータを後方に進める(function template) (C++11) |
| [`reverse_iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/reverse_iterator) | 逆方向に進むイテレータアダプタ(class template) |
| [`back_insert_iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/back_insert_iterator) | 末尾に要素を挿入する出力イテレータアダプタ(class template) |
| [`front_insert_iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/front_insert_iterator) | 先頭に要素を挿入する出力イテレータアダプタ(class template) |
| [`insert_iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/insert_iterator) | 任意の位置に要素を挿入する出力イテレータアダプタ(class template) |
| [`move_iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/move_iterator) | 間接参照時にムーブするイテレータアダプタ(class template) (C++11) |
| [`istream_iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/istream_iterator) | 入力ストリームイテレータ(class template) |
| [`ostream_iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/ostream_iterator) | 出力ストリームイテレータ(class template) |
| [`istreambuf_iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/istreambuf_iterator) | 入力ストリームバッファイテレータ(class template) |
| [`ostreambuf_iterator`](https://sites.google.com/site/cpprefjp/reference/iterator/ostreambuf_iterator) | 出力ストリームバッファイテレータ(class template) |
| [`begin`](https://sites.google.com/site/cpprefjp/reference/iterator/begin) | 範囲の先頭を指すイテレータを取得する(function template) (C++11) |
| [`end`](https://sites.google.com/site/cpprefjp/reference/iterator/end) | 範囲の末尾の次を指すイテレータを取得する(function template) (C++11) |





