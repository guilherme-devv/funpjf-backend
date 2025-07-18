import { useParams, Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { noticiasService } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

export default function NoticiaDetalhes() {
  const { id } = useParams()

  const { data: noticia, isLoading, error, refetch } = useQuery(
    ['noticia', id],
    () => noticiasService.getById(id),
    { 
      select: (response) => response.data,
      enabled: !!id 
    }
  )

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error.message} onRetry={refetch} />
  if (!noticia) return <ErrorMessage message="Notícia não encontrada" />

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <Link
          to="/noticias"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para notícias
        </Link>
      </div>

      <article className="card">
        {noticia.imagem && (
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
          />
        )}

        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            noticia.status === 'publicado' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {noticia.status === 'publicado' ? 'Publicado' : 'Não Publicado'}
          </span>
          
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            Publicado em {new Date(noticia.data_criacao).toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {noticia.titulo}
        </h1>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Resumo</h2>
          <p className="text-gray-700 leading-relaxed">
            {noticia.resumo}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {noticia.conteudo_completo}
          </div>
        </div>

        {noticia.data_atualizacao !== noticia.data_criacao && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Última atualização: {new Date(noticia.data_atualizacao).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        )}
      </article>

      <div className="mt-8 text-center">
        <Link
          to="/noticias"
          className="btn-primary"
        >
          Ver mais notícias
        </Link>
      </div>
    </div>
  )
}