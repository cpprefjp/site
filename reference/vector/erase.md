#erase
```cpp
// C++03まで
iterator erase(iterator position);
iterator erase(iterator first, iterator last);
```

// C++11から
iterator erase(const_iterator position);iterator erase(const_iterator first, const_iterator last);



##概要

##指定した要素を削除する。

##要件

`T`はMoveAssignableでなければならない。


##効果

1引数版は、`position`が指す要素が削除される。2引数版は、`[first, last)`で示される範囲の要素が削除される。削除された要素またはそれ以降の要素を指すイテレータや参照は無効になる。


##戻り値

削除された要素の次の要素を指すイテレータを返す。そのような要素が存在しない場合は、[`end()`](/reference/vector/end.md)を返す。さらに、削除された要素以降の要素の数と同じ回数の`T`のムーブ代入演算子が呼ばれる。


##計算量

削除される要素の数と同じ回数の`T`のデストラクタが実行される。


##備考

コピーコンストラクタ、ムーブコンストラクタ、代入演算子、ムーブ代入演算子が例外を投げる場合を除いて、この関数は例外を投げない。

##例

```cpp
<pre style='margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px'><dfn style='font-style:normal'>#include <iostream></dfn><dfn style='font-style:normal'>#include <vector></dfn><var style='font-style:normal'>int</var> main (){  <var style='font-style:normal'>unsigned</var> <var style='font-style:normal'>int</var> i;  std::vector<<var style='font-style:normal'>unsigned</var> <var style='font-style:normal'>int</var>> myvector;  <cite style='font-style:normal'>// set some values (from 1 to 10)</cite>  <var style='font-style:normal'>for</var> (i=1; i<=10; i++) myvector.push_back(i);    <cite style='font-style:normal'>// erase the 6th element</cite>  myvector.erase(myvector.begin()+5);  <cite style='font-style:normal'>// erase the first 3 elements:</cite>  myvector.erase(myvector.begin(),myvector.begin()+3);  std::cout << <kbd style='font-style:normal'>"myvector contains:"</kbd>;  <var style='font-style:normal'>for</var> (i=0; i<myvector.size(); i++)    std::cout << <kbd style='font-style:normal'>" "</kbd> << myvector[i];  std::cout << std::endl;  <var style='font-style:normal'>return</var> 0;}</pre>
```

###出力

```cpp
<pre style='margin:0px;padding:0px'><samp>myvector contains: 4 5 7 8 9 10</samp></pre>
```
