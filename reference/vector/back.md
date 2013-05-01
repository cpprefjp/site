#back
```cpp
reference back();const_reference back() const;
```

##要件



##効果



##戻り値

a.back()は末尾の要素への参照を返す。もし、aがconstだった場合には、末尾の要素へのconst参照を返す。a.back() は{ auto tmp = a.end(); --tmp; return *tmp; } と同じ結果になる。


##計算量



##備考



##例

```cpp
<pre style='margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px'><dfn style='font-style:normal'>#include <iostream></dfn><dfn style='font-style:normal'>#include <vector></dfn><var style='font-style:normal'></var></pre><pre style='margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px'><var style='font-style:normal'>int</var> main (){  std::vector<<var style='font-style:normal'>int</var>> myvector;  myvector.push_back(10);  <var style='font-style:normal'>while</var> (myvector.back() != 0) {    myvector.push_back ( myvector.back() -1 );  }  std::cout << <kbd style='font-style:normal'>"myvector contains:"</kbd>;  <var style='font-style:normal'>for</var> (<var style='font-style:normal'>unsigned</var> i=0; i<myvector.size() ; i++)    std::cout << <kbd style='font-style:normal'>" "</kbd> << myvector[i];  std::cout << std::endl;  <var style='font-style:normal'>return</var> 0;}</pre>
```

###出力

```cpp
<pre style='margin:0px;padding:0px'><samp>myvector contains: 10 9 8 7 6 5 4 3 2 1 0</samp></pre>
```

##
