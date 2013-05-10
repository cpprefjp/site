#melponメモ
-std::vector<bool>: Effective STL 第18項: vector<bool>がSTLのコンテナとして悪い点は2つしかない。第1に、STLのコンテナではない。第2に、bool型の値が格納されない。この2つを除けば、異議を唱える理由はない。-lower_bound+insertif (m.find(key) != m.end()) {  m[key] = value;} else {  m.insert(key, std::make_pair(key, value));}2回探索している。auto lb = m.lower_bound(key);if (lb != m.end() && !(m.key_comp()(key, lb->first))) {  lb->second = value;} else {  m.insert(lb, std::make_pair(key, value));}検索+挿入を一回の探索で行うことができる。
-sort+uniquesort(v.begin(), v.end());
unique(v.begin(), v.end()); // unique_copy(v.begin(), v.end(), v2.begin());-各イテレータの要件24.2, 829pageInput IteratorOutput IteratorForward IteratorBidirectional IteratorRandom Access IteratorC++03 からの差分class iterator_traitsclass iteratoriterator tagsadvance, distance, next, prevclass move_iteratorrange access-hash--ユーザ定義namespace std {  template<>  struct hash<Hoge> {    std::size_t operator()(const Hoge& h) const { return ...; }  };}--unordered_mapunordered_map<  Key,  T,  Hash = hash<Key>,  ...>hash を特殊化するか、Hash に指定したいハッシュクラスを渡せばいい。--17.6.3.4 Hash requirementsHash の要件は- function object type であること- CopyConstructible と Destructible の要件を満たしていること-function object type: HH の引数の型: KeyH のオブジェクト: hKey の lvalue: uKey 型に変換可能な値: kがあるとき、以下の要件を満たすh(k): size_t: k のみに依存した値を返さなければならない。[Note: つまりkが同じならh(k)は常に同じ値を返す。][Note: t1とt2の値が異なっているとき、h(t1)とh(t2)が同じになる確率は1.0/numeric_limits<size_t>::max()の確率にするべきである]h(u): size_t: uを変更してはならない--template<class T> struct hash の定義オリジナルの hash の定義: <functional>組み込み型（ポインタ含む）に対する特殊化: <functional>その他の標準の型に対する特殊化: それぞれのヘッダで特殊化されている--template<class T> struct hash の requirementsunordered associative containers はデフォルトでこのhashクラスを使う。hash<Key>は以下の要件を満たしていなければならない。
-Hash requirements である-lvalueはswappableである-Key 型の result_type と size_t 型の argument_type という synonym を提供している-k1 == k2 なら h(k1) == h(k2) である。（k1,k2 は Key 型のオブジェクト、h は hash<Key> のオブジェクト）-hash<Key>がユーザ定義の特殊化である場合を除き、h(k)は例外を投げてはならない（k は Key 型のオブジェクト、h は hash<Key> のオブジェクト）-accumulateの副作用C++03は「binary_op shall not cause side effects」C++11は「In the range [first,last], binary_op shall neither modify elements nor invalidate iterators or subranges.」-copy_nの処理順序copy_nの処理順序は規定されていないので、copyで領域が重なっていても平気な場合であってもcopy_nでは未定義になる場合がある。copy_nはそもそも「single traversalなiteratorが入力なせいでn個先のiteratorが取れない場合のcopyに対する代替」らしいので、そのケースであれば入力と出力が重なるということは考えられない。http://www.sgi.com/tech/stl/copy_n.html >>Copy_n is almost, but not quite, redundant. If first is an input iterator, as opposed to a forward iterator, then the copy_n operation can't be expressed in terms of copy.<<

<h1 style='font-family:Trebuchet MS,serif;margin-top:1.5em;margin-bottom:0.5em;font-size:2em;color:rgb(167,112,112)'>24 Iterators library</h1>

##24.1 General

##24.2 Iterator 要求

###24.2.1 In general
<p style='margin-top:1em;margin-bottom:1em'>1 イテレータは uniform manner 内で異なるデータ構造（コンテナ）を動かすためのC++プログラムを許可するポインタを一般化する。 構築可能なテンプレートアルゴリズムはイテレータの work correctly と semantics と complexity assumptions が働く。 全ての input iterator i は iterator の value type と呼ばれる T 型の値を返す *i という式をサポートしている。 全ての output iterator は *i = o という式をサポートしている。o は、i の particular iterator 型に writable な型の集合の中の型の値である。 全ての iterator i について (*i).m という式が well-defined である iterator は、i->m という (*i).m と同じセマンティクスをサポートする。 X 型の iterator の equality は、iterator の difference type と呼ばれている signed integer 型で定義される。</p><p style='margin-top:1em;margin-bottom:1em'>2 イテレータがポインタの抽象になってから、それらのセマンティクスはC++のポインタのセマンティクスの多くを一般化している。 それはイテレータを取る関数テンプレートが正規のポインタでも動作することを保証する。 この国際標準は操作によって分類した５つのイテレータのカテゴリを定義する。 input iterator, output iterator, forward iterator, bidirectional iterator, random access iterator である。</p><p style='margin-top:1em;margin-bottom:1em'>3 forward iterator は input iterator の要求を全て満たし、input iterator が指定されるところでも使うことができる。 同様に bidirectional iterator も forward iterator の要求を全て満たし、forward iterator が指定されているところでも使うことができる。 同様に random access iterator も bidirectional iterator の要求を全て満たし、bidirectional iterator が指定されているところでも使うことができる。</p><p style='margin-top:1em;margin-bottom:1em'>4 output iterator の要求をさらに満たしている iterator は mutable iterator と呼ばれる。 nonmutable な iterator は constant iterator として参照される。</p><p style='margin-top:1em;margin-bottom:1em'>5 正規のポインタとしての配列の保証は配列の最後の要素の次の位置を指すポインタ値なので、任意のイテレータ型は対応するシーケンスの最後の要素の次の位置を指すイテレータ値になる。 それらの値は past-the-end 値と呼ばれる。 *i という式が定義されている iterator i の値は deferenceable と呼ばれる。 past-the-end value が dereferenceable であることを、そのライブラリは assume しない。 iterator もまた、どのシーケンスにも関連しない singular value を持つことができる。（例: 未初期化のポインタの宣言（int* x;）の後、x は単一のポインタ値を持つことをいつも保証しなければならない。） 多くの式の結果は singular values のために定義されていない。例外だけは、singular value を保持する iterator を破棄し、non-singular value を singular value を保持する iterator へ代入し、そして、DefaultConstructible の要件を満たす iterator のためにコピーやムーブのソースとして value-initialized iterator を使う。（ノート: この保証はデフォルト初期化を提供しないが、この特徴は、ポインタや、ポインタを保持するアグリゲートといった自明なデフォルトコンストラクタを持つ型だけを問題にしている。） これらのケースでは、singular value は他の値と同じ方法で上書きされる。 Dereference 可能な値は常に non-singular である。</p><p style='margin-top:1em;margin-bottom:1em'>6 iterator i と iterator j があり、++i によって i == j になるような有限シーケンスがある場合のみ、j は i から reachable であると呼ばれる。 もし j が i から reachable である場合、それらは同じシーケンスの要素を参照する。</p><p style='margin-top:1em;margin-bottom:1em'>7 多くのライブラリのアルゴリズム的なテンプレートは range を使うインターフェースを持つデータ構造を操作する。 range はその計算の始まりと終わりを指定するするイテレータのペアである。 range [i,i) は空の range である。一般的に、range [i,j) は i が指す要素から始まり、j を指す要素を含まない場所までのデータ構造の要素を参照する。 range [i,j) は j が i から reachable である場合のみ有効である。 無効な range をライブラリの関数に適用した結果は未定義である。</p><p style='margin-top:1em;margin-bottom:1em'>8 全ての iterator のカテゴリは、（償却）定数時間で与えられたカテゴリのために実現可能なそれらの関数のみを要求する。従って、iterator のための requirement table に計算量の列は無い。</p><p style='margin-top:1em;margin-bottom:1em'>9 iterator の破棄では、ポインタを無効にしたり、その iterator からあらかじめ取得しておいた参照にしても構わない。</p><p style='margin-top:1em;margin-bottom:1em'>10 iterator は singular でも構わない。それは無効な iterator となる。</p><p style='margin-top:1em;margin-bottom:1em'>11 以下のセクションでは、a と b は X または const X 型の値を意味し、difference_type と reference は iterator_traits<X>::difference_type と iterator_traits<X>::reference を意味する。n はそれぞれ difference_type, u, tmp の値を意味し、m は識別子を意味し、r は X& を意味し、t は value type T の値を意味し、o は output iterator へ書き込み可能な何らかの型の値を意味する。（ノート: iterator type X は iterator_traits<X> のインスタンスが存在していなければならない）</p>

###24.2.2 Iterator
<p style='margin-top:1em;margin-bottom:1em'>1 Iterator は iterator コンセプトの分類を基礎とした形式を要求する。つまりどのイテレータも Iterator 要求を満たす。 この要求の集まりはイテレータのデリファレンスやインクリメントのための操作を指定する。 多くのアルゴリズムは、値の read や write、豊富な iterator ムーブメントの集まりを提供することといった追加操作を要求するだろう。</p><p style='margin-top:1em;margin-bottom:1em'>2 もし</p><ul style='margin-top:1em;margin-bottom:1em;margin-left:2em;padding-left:0.5em'><li style='margin-top:0.3em;margin-right:auto;margin-bottom:0.3em;margin-left:auto'>X が CopyConstructible, CopyAssignable, Destructible 要求を満たし、X 型の lvalue が swappable で、</li><li style='margin-top:0.3em;margin-right:auto;margin-bottom:0.3em;margin-left:auto'>Table 106 の式が有効で、示されたセマンティクスを持っているなら、</li><p style='margin-top:1em;margin-bottom:1em'>X 型は Iterator 要求を満たす。</p><p style='margin-top:1em;margin-bottom:1em'>Table 106 - Iterator 要求</p>

|
|
|
|*r |reference |  |事前条件: r はデリファレンス可能 |
|++r |X& |  |  |

###24.2.3 Input iterator
<p style='margin-top:1em;margin-bottom:1em'>1 X が Iterator かつ EqualityComparable 要求を満たし、Table 107 の式が有効で、示されたセマンティクスを持っているなら、型 X のクラスやポインタは value type T のための input iterator の要求を満たす。</p><p style='margin-top:1em;margin-bottom:1em'>2 Table 107 内にある「== のドメイン」は、== が定義される値の集まりを意味する、通常の数学的な意味である。 この集まりは徐々に変わることができる。 それぞれのアルゴリズムは、それを使うイテレータ値のために == のドメイン上で追加の要求を置く。 それらの要求は == と != を作るアルゴリズムの使用から推論される。 （例: find(a,b,x) 呼び出しは、a の値がプロパティ p を持っている場合のみ定義される。a の値がプロパティ p を持っている状態は以下のように定義される。 (`*i==x`) であるか、(`*i!=x`) かつ (`++i` がプロパティ p を持っている) 場合、b がプロパティ p を持っていて、値 i がプロパティ p を持っている）</p><p style='margin-top:1em;margin-bottom:1em'>Table 107 Input iterator 要求（Iterator からの追加）</p>

|
|
|
|a!=b |bool へ contextually convert 可能な型 |!(a==b) |事前条件: (a,b) は == のドメイン |
|*a |T へ変換可能な型 |  |事前条件: a はデリファレンス可能(void)*a,*a という式が *a と等価a==b かつ (a,b) が == のドメインなら、*a は *b と等価 |
|a->m |  |(*a).m |事前条件: a はデリファレンス可能 |
|++r |X& |  |事前条件: r はデリファレンス可能事後条件: r はデリファレンス可能であるか、past-the-end事後条件: r の前の値のコピーがデリファレンス可能であることや == のドメインであることはもう既に要求されない |
|(void)r++ |  |  |(void)++r と等価 |
|*r++ |T へ変換可能な型 |{ T tmp = *r;++r;return tmp; } |  |
<p style='margin-top:1em;margin-bottom:1em'>3 ノート: input iterator について、`a == b` は `++a == ++b` を暗示しない。 （等値性は substitution property あるいは referential transparency を保証しない） input iterator 上のアルゴリズムは、同じイテレータを2回通してはならない。 それらは single pass のアルゴリズムでなければならない。 value type T は CopyAssignable 型であることを要求しない。 これらのアルゴリズムは istream_iterator を通した入力データのソースとしての istream で使われる。</p>

###24.2.4 Output Iterators
<p style='margin-top:1em;margin-bottom:1em'>1 X が Iterator かつ EqualityComparable 要求を満たし、Table 108 の式が有効で、示されたセマンティクスを持っているなら、型 X のクラスやポインタは output iterator の要求を満たす。</p><p style='margin-top:1em;margin-bottom:1em'>Table 108 - Output iterator 要求（Iterator からの追加）</p>

|
|
|
|*r = o |結果は使われない |  |Remarks: r の操作の後はデリファレンス可能であることを要求しない事後条件: r はインクリメンタル可能 |
|++r |X& |  |&r == &++r Remarks: r の操作の後はデリファレンス可能であることを要求しない事後条件: r はインクリメンタル可能 |
|r++ |const X& へ変換可能 |{ X tmp = r;++r;return tmp; } |Remarks: r の操作の後はデリファレンス可能であることを要求しない事後条件: r はインクリメンタル可能 |
|*r++ = o |結果は使われない |  |Remarks: r の操作の後はデリファレンス可能であることを要求しない事後条件: r はインクリメンタル可能 |
<p style='margin-top:1em;margin-bottom:1em'>2 ノート: operator* は代入ステートメントの左側だけでしか有効ではない。 iterator の同じ値を通す代入は一度だけ起きる。 output iterator 上のアルゴリズムは、同じイテレータを2回通してはならない。 それらは single pass のアルゴリズムでなければならない。 等値性と非等値性は定義されてなくても構わない。 output iterator を取るアルゴリズムは、イテレータやポインタをインサートしたり ostream_iterator クラスを通じたデータの配置のための定義としての ostream で使われる。</p>

###24.2.5 Forward iterators
<p style='margin-top:1em;margin-bottom:1em'>1 もしクラスまたはポインタ型 X について、</p><ul style='margin-top:1em;margin-bottom:1em;margin-left:2em;padding-left:0.5em'><li style='margin-top:0.3em;margin-right:auto;margin-bottom:0.3em;margin-left:auto'>X が input iterator の要求を満たす</li><li style='margin-top:0.3em;margin-right:auto;margin-bottom:0.3em;margin-left:auto'>X が DefaultConstructible の要求を満たす</li><li style='margin-top:0.3em;margin-right:auto;margin-bottom:0.3em;margin-left:auto'>X が mutable iterator である場合、`reference` が T への参照であり、X が const iterator である場合、`reference` は const T への参照である</li><li style='margin-top:0.3em;margin-right:auto;margin-bottom:0.3em;margin-left:auto'>Table 109 の式が有効であり、示されたセマンティクスを持っている</li><li style='margin-top:0.3em;margin-right:auto;margin-bottom:0.3em;margin-left:auto'>X 型のオブジェクトが、以下に説明してあるように、multi-pass guarantee を提供する</li><p style='margin-top:1em;margin-bottom:1em'>2 forward iterator の == のドメインは、同じシーケンス上にあるイテレータである</p><p style='margin-top:1em;margin-bottom:1em'>3 2つの、X 型でデリファレンス可能なイテレータ `a` と `b` は、以下の場合に multi-pass guarantee を提供する</p><ul style='margin-top:1em;margin-bottom:1em;margin-left:2em;padding-left:0.5em'><li style='margin-top:0.3em;margin-right:auto;margin-bottom:0.3em;margin-left:auto'>`a == b` が `++a == ++b` を暗示している</li><li style='margin-top:0.3em;margin-right:auto;margin-bottom:0.3em;margin-left:auto'>X がポインタ型であるか、`(void)++X(a), *a` という式が `*a` と等価である</li><p style='margin-top:1em;margin-bottom:1em'>4 ノート: `a == b` が `++a == ++b` を暗示するという要求（これは input/output iterator のどちらも真ではない）と、mutable iterator での代入回数の制限の除去は、forward iterator において multi-pass で one-directional なアルゴリズムの使用を許可する。</p><p style='margin-top:1em;margin-bottom:1em'>Table 109 Forward iterator 要求（input iterator からの追加）</p>

|
|
|
|r++ |`const X&` へ変換可能 |{ X tmp = r;++r;return tmp; } |  |
|*r++ |`reference` |  |  |
<p style='margin-top:1em;margin-bottom:1em'>5 `a` と `b` が等値である場合、`a` と `b` はどちらもデリファレンス可能であるか、どちらもデリファレンス不可能であるかである。</p><p style='margin-top:1em;margin-bottom:1em'>6 `a` と `b` の両方がデリファレンス可能である場合、`*a` と `*b` が同じオブジェクトへの領域である場合のみ `a == b` である</p>

###24.2.6 Bidirectional iterators
<p style='margin-top:1em;margin-bottom:1em'>1 クラスまたはポインタ型 X が forward iterator の要求を満たし、Table 110 の式が有効である場合、X は bidirectional iterator の要求を満たしている。</p><p style='margin-top:1em;margin-bottom:1em'>Table 110 - Bidirectional iterator 要求（forward iterator からの追加）</p>

|
|
|
|--r |X& |  |事前条件: `r == ++s` となる `s` が存在する事後条件 `r` はデリファレンス可能`--(++r) == r``--r == --s` が `r == s` を暗示する`&r == &--r` |
|r-- |`const X&` へ変換可能 |{ X tmp = r;--r;return tmp; } |  |
|*r-- |`reference` |  |  |
<p style='margin-top:1em;margin-bottom:1em'>2 Bidirectional iterator は前方へも後方へも移動するイテレータのためのアルゴリズムを許可する</p>

###24.2.7 Random access iterators
<p style='margin-top:1em;margin-bottom:1em'>クラスまたはポインタ型 X が bidirectional iterator の要求を満たし、Table 111 の式が有効である場合、X は random access iterator の要求を満たしている。</p><p style='margin-top:1em;margin-bottom:1em'>Table 111 - Random access iterator 要求（bidirectional iterator からの追加）</p>

|
|
|
|`r += n` |`X&` |`{ difference_type m = n;``if (m >= 0) while (m--) ++r;``else while (m++) --r;``return r; }` |  |
|`a + n``n + a` |`X` |`{ X tmp = a;``return tmp += n; }` |`a + n == n + a` |
|`r -= n` |`X&` |`return r += -n;` |  |
|`a - n` |`X` |`{ X tmp = a;``return tmp -= n; }` |  |
|`b - a` |`difference_type` |`return n` |事前条件: `a + n == b` であるような `difference_type` 型の値 n と `a` が存在する`b == a + (b - a)` |
|`a[n]` |`reference` へ変換可能 |`*(a + n)` |  |
|`a < b` |`bool` へ contextually convert 可能 |`b - a > 0` |`<` は total ordering relation |
|`a > b` |`bool` へ contextually convert 可能 |`b < a` |`>` は `<` と対になる total ordering relation |
|`a >= b` |`bool` へ contextually convert 可能 |`!(a < b)` |`>` は `<` と対になる total ordering relation |
|`a <= b` |`bool` へ contextually convert 可能 |`!(a > b)` |`>` は `<` と対になる total ordering relation |
</span>
